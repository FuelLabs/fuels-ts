import type { getOctokit } from '@actions/github';
import type { LinearClient } from '@linear/sdk';

export async function prToLinearLinker(params: {
  pullNumber: number;
  owner: string;
  repo: string;
  linearClient: LinearClient;
  octokit: ReturnType<typeof getOctokit>;
}) {
  const { pullNumber, owner, repo, octokit, linearClient } = params;
  const {
    data: { body },
  } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: pullNumber,
  });

  const prUrl = `https://github.com/${owner}/${repo}/pull/${pullNumber}`;

  const closingIssuesRegex =
    /(close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved)\s+#(\d+)/gi;
  const closingIssues = [...body!.matchAll(closingIssuesRegex)].map(
    ([, , issueNo]) => `https://github.com/${owner}/${repo}/issues/${issueNo}`
  );

  const relatedIssuesRegex = /(relates\sto|related\sto)\s+#(\d+)/gi;
  const relatedIssues = [...body!.matchAll(relatedIssuesRegex)].map(
    ([, , issueNo]) => `https://github.com/${owner}/${repo}/issues/${issueNo}`
  );

  const ghIssuesUrls = closingIssues.concat(relatedIssues);

  const ghIssuesAndPr = ghIssuesUrls.concat([prUrl]);
  const { nodes: linearIssues } = await linearClient.issues({
    filter: {
      attachments: {
        url: {
          in: ghIssuesAndPr,
        },
      },
    },
  });

  const closingLinearIssues: string[] = [];
  const relatedLinearIssues: string[] = [];
  const attachmentsToDelete: string[] = [];

  for (const issue of linearIssues) {
    const { nodes: attachments } = await issue.attachments({
      filter: { url: { in: ghIssuesAndPr } },
    });
    if (attachments.some((a) => closingIssues.includes(a.url))) {
      closingLinearIssues.push(issue.identifier);
      // eslint-disable-next-line no-continue
      continue;
    }
    if (attachments.some((a) => relatedIssues.includes(a.url))) {
      relatedLinearIssues.push(issue.identifier);
      // eslint-disable-next-line no-continue
      continue;
    }

    const unlinkedAttachment =
      attachments.every((a) => !ghIssuesUrls.includes(a.url)) &&
      attachments.find((a) => a.url === prUrl);
    if (unlinkedAttachment) {
      attachmentsToDelete.push(unlinkedAttachment.id);
    }
  }

  const closesIssues = closingLinearIssues.join(', ');
  const relatesIssues = relatedLinearIssues.join(', ');

  const linearIssuesChanged = !body?.includes(closesIssues) || !body.includes(relatesIssues);
  const closingIssuesComment = `<!-- LINEAR: closes ${closesIssues} -->`;
  const relatedIssuesComment = `<!-- LINEAR: relates to ${relatesIssues} -->`;

  if (linearIssuesChanged) {
    const newBody = `${closingIssuesComment}\n${relatedIssuesComment}\n${body}`;
    await octokit.rest.pulls.update({
      owner,
      repo,
      pull_number: pullNumber,
      body: newBody,
    });
  }

  for (const attachmentId of attachmentsToDelete) {
    await linearClient.deleteAttachment(attachmentId);
  }
}
