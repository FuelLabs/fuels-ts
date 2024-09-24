/* eslint-disable tsdoc/syntax */
import { getOctokit } from '@actions/github';
import type { Issue, IssueConnection } from '@linear/sdk';
import { LinearClient } from '@linear/sdk';
import { randomBytes, randomInt } from 'crypto';

import { linkPrToLinear } from './pr-to-linear-linker.js';

const linearClient = new LinearClient({
  apiKey: 'linear-api-key',
});
const octokit = getOctokit('gh-key');

const owner = 'FuelLabs';
const repo = 'fuels-ts';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function mockLinearIssue(ghIssueId: number, attachmentType: 'issues' | 'pull') {
  const attachments = [
    {
      id: randomBytes(32).toString('hex'),
      url: `https://github.com/${owner}/${repo}/${attachmentType}/${ghIssueId}`,
    },
  ];
  return {
    identifier: `TS-${randomInt(10_000)}`,
    attachments: () =>
      Promise.resolve({
        nodes: attachments,
      }),
  } as unknown as Issue;
}

type PRInfo = Awaited<ReturnType<typeof octokit.rest.pulls.get>>['data'];

function setupMock() {
  let closingKeywords = [
    'close',
    'closes',
    'closed',
    'fix',
    'fixes',
    'fixed',
    'resolve',
    'resolves',
    'resolved',
  ];

  closingKeywords = [
    ...closingKeywords,
    ...closingKeywords.map(capitalize),
    ...closingKeywords.map((k) => k.toUpperCase()),
  ];

  const closingIssues = closingKeywords.map(() => randomInt(10_000));

  let relatedKeywords = ['related to', 'relates to', 'part of'];

  relatedKeywords = [
    ...relatedKeywords,
    ...relatedKeywords.map(capitalize),
    ...relatedKeywords.map((k) => k.toUpperCase()),
  ];
  const relatedIssues = relatedKeywords.map(() => randomInt(10_000));

  const issues = closingIssues.concat(relatedIssues);

  const keywords = closingKeywords.concat(relatedKeywords);
  const body = keywords.map((k, idx) => `${k} #${issues[idx]}`).join(', ');
  const pullNumber = randomInt(10_000);

  // @ts-expect-error this is what we need of the PR
  const pr: PRInfo = {
    body,
    number: pullNumber,
  };

  // @ts-expect-error this is what we need of the PR
  vi.spyOn(octokit.rest.pulls, 'get').mockImplementation(() => Promise.resolve({ data: pr }));

  const mockClosingIssues = closingIssues.map((i) => mockLinearIssue(i, 'issues'));
  const mockRelatedIssues = relatedIssues.map((i) => mockLinearIssue(i, 'issues'));

  vi.spyOn(linearClient, 'issues').mockImplementation(() =>
    Promise.resolve({ nodes: mockClosingIssues.concat(mockRelatedIssues) } as IssueConnection)
  );

  return { pr, mockClosingIssues, mockRelatedIssues };
}

/**
 * @group node
 */
describe('linear', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('PR closing or being related to a GH issue is linked to Linear issue', async () => {
    const { pr, mockClosingIssues, mockRelatedIssues } = setupMock();

    const updatePrSpy = vi
      .spyOn(octokit.rest.pulls, 'update')
      // @ts-expect-error dont need the response
      .mockImplementation(() => Promise.resolve());

    await linkPrToLinear({ pullNumber: pr.number, owner, repo, octokit, linearClient });

    const closingLinearIssues = `<!-- LINEAR: closes ${mockClosingIssues
      .map((i) => i.identifier)
      .sort()
      .join(', ')} -->`;
    const relatedLinearIssues = `<!-- LINEAR: relates to ${mockRelatedIssues
      .map((i) => i.identifier)
      .sort()
      .join(', ')} -->`;
    const expectedBody = `${closingLinearIssues}\n${relatedLinearIssues}\n${pr.body}`;

    expect(updatePrSpy).toHaveBeenCalledTimes(1);
    expect(updatePrSpy).toHaveBeenCalledWith({
      owner,
      repo,
      pull_number: pr.number,
      body: expectedBody,
    });
  });

  test("PR body isn't updated when there are no linear-related changes", async () => {
    const { pr } = setupMock();

    const updatePrSpy = vi
      .spyOn(octokit.rest.pulls, 'update')
      // @ts-expect-error dont need the response
      .mockImplementation(({ body }) => {
        // this is the same PR object that the second call to linkGitHubPRToLinearIssues will work with again
        // when it calls octokit.rest.pulls.get
        pr.body = `${body}\n change unrelated to linear`;
        return Promise.resolve();
      });

    await linkPrToLinear({ pullNumber: pr.number, owner, repo, octokit, linearClient });

    expect(updatePrSpy).toHaveBeenCalledTimes(1);

    await linkPrToLinear({ pullNumber: pr.number, owner, repo, octokit, linearClient });

    expect(updatePrSpy).toHaveBeenCalledTimes(1);
  });

  test('Linear issues linked to a PR get unlinked when the PR stops referencing the issue', async () => {
    const pullNumber = randomInt(10_000);
    const url = `https://github.com/${owner}/${repo}/pull/${pullNumber}`;

    // @ts-expect-error this is what we need of the PR
    const pr: PRInfo = {
      body: '',
      url,
      number: pullNumber,
    };
    // @ts-expect-error this is what we need of the PR
    vi.spyOn(octokit.rest.pulls, 'get').mockImplementation(() => Promise.resolve({ data: pr }));

    const issuesLinkedToPr = [
      mockLinearIssue(pullNumber, 'pull'),
      mockLinearIssue(pullNumber, 'pull'),
    ];

    vi.spyOn(linearClient, 'issues').mockImplementation(() =>
      Promise.resolve({ nodes: issuesLinkedToPr } as IssueConnection)
    );

    const deleteAttachmentSpy = vi
      .spyOn(linearClient, 'deleteAttachment')
      // @ts-expect-error dont need the response
      .mockImplementation(() => Promise.resolve());

    await linkPrToLinear({ pullNumber: pr.number, owner, repo, octokit, linearClient });

    expect(deleteAttachmentSpy).toHaveBeenCalledTimes(issuesLinkedToPr.length);

    for (const issue of issuesLinkedToPr) {
      const attachmentId = (await issue.attachments()).nodes[0].id;
      expect(deleteAttachmentSpy).toHaveBeenCalledWith(attachmentId);
    }
  });
});
