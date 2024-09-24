import type { getOctokit } from '@actions/github';
import type { LinearClient } from '@linear/sdk';

function parsePr(params: { prBody: string; owner: string; repo: string; prNo: number }) {
  const { prBody, owner, repo, prNo } = params;

  const prUrl = `https://github.com/${owner}/${repo}/pull/${prNo}`;

  const issueUrl = `https://github.com/${owner}/${repo}/issues/%s`;
  const closingIssuesRegex = /(close(?:s|d)?|fix(?:es|ed)?|resolve(?:s|d)?)\s#(\d+)/gi;

  const formatIssueUrl = (r: RegExpExecArray) => issueUrl.replace('%s', r[2]);

  const closingIssues = [...prBody.matchAll(closingIssuesRegex)].map(formatIssueUrl);

  const relatedIssuesRegex = /(relate(?:s|d)\sto|part\sof)\s+#(\d+)/gi;

  const relatedIssues = [...prBody.matchAll(relatedIssuesRegex)].map(formatIssueUrl);

  return { closingIssues, relatedIssues, prUrl };
}

export async function linkPrToLinear(params: {
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
    prNo: pullNumber,
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
