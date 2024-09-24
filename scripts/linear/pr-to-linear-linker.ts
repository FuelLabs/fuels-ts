import type { getOctokit } from '@actions/github';
import type { LinearClient } from '@linear/sdk';

function parsePr(params: { prBody: string; owner: string; repo: string; pullNumber: number }) {
  const { prBody, owner, repo, pullNumber } = params;
  const closingIssuesRegex =
    /(close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved)\s+#(\d+)/gi;
  const closingIssues = [...prBody.matchAll(closingIssuesRegex)].map(
    ([, , issueNo]) => `https://github.com/${owner}/${repo}/issues/${issueNo}`
  );

  const relatedIssuesRegex = /(relates\sto|related\sto|part\sof)\s+#(\d+)/gi;
  const relatedIssues = [...prBody.matchAll(relatedIssuesRegex)].map(
    ([, , issueNo]) => `https://github.com/${owner}/${repo}/issues/${issueNo}`
  );
  const prUrl = `https://github.com/${owner}/${repo}/pull/${pullNumber}`;

  return { closingIssues, relatedIssues, prUrl };
}

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

  const { closingIssues, relatedIssues, prUrl } = parsePr({
    ...params,
    prBody: body as string,
  });

  const allIssues = closingIssues.concat(relatedIssues);

  const allIssuesAndPr = allIssues.concat([prUrl]);
  const { nodes: linearIssues } = await linearClient.issues({
    filter: {
      attachments: {
        url: {
          in: allIssuesAndPr,
        },
      },
    },
  });

  const closingLinearIssues: string[] = [];
  const relatedLinearIssues: string[] = [];
  const attachmentsToDelete: string[] = [];

  for (const issue of linearIssues) {
    const { nodes: attachments } = await issue.attachments({
      filter: { url: { in: allIssuesAndPr } },
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
      attachments.every((a) => !allIssues.includes(a.url)) &&
      attachments.find((a) => a.url === prUrl);

    if (unlinkedAttachment) {
      attachmentsToDelete.push(unlinkedAttachment.id);
    }
  }

  const closes = closingLinearIssues.sort().join(', ');
  const relatesTo = relatedLinearIssues.sort().join(', ');

  const linearIssuesChanged = !body?.includes(closes) || !body.includes(relatesTo);

  if (linearIssuesChanged) {
    const closingIssuesComment = `<!-- LINEAR: closes ${closes} -->`;
    const relatedIssuesComment = `<!-- LINEAR: relates to ${relatesTo} -->`;
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
