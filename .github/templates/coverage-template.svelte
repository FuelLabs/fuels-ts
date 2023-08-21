<!-- Source: https://github.com/sidx1024/report-nyc-coverage-github-action/blob/0497921dcf4795ad835885dfdae0ebc71c3f702f/comment-template.svelte -->

<script>
  export let total_statements_coverage_percent_raw;
  export let total_branches_coverage_percent_raw;
  export let total_functions_coverage_percent_raw;
  export let total_lines_coverage_percent_raw;

  export let base_total_statements_coverage_percent_raw;
  export let base_total_branches_coverage_percent_raw;
  export let base_total_functions_coverage_percent_raw;
  export let base_total_lines_coverage_percent_raw;

  export let commit_sha;
  export let short_commit_sha;
  export let commit_link;

  export let base_commit_sha;
  export let base_short_commit_sha;
  export let base_commit_link;
  export let base_ref;

  export let changed_files_coverage_data;

  const has_base_data = base_total_branches_coverage_percent_raw !== '?';
  const summary_list = [
    {
      type: 'Total Statements Coverage',
      percent: {
        total: total_statements_coverage_percent_raw,
        base: has_base_data ? base_total_statements_coverage_percent_raw : null,
        diff: has_base_data
          ? total_statements_coverage_percent_raw - base_total_statements_coverage_percent_raw
          : null,
      },
    },
    {
      type: 'Total Branches Coverage',
      percent: {
        total: total_branches_coverage_percent_raw,
        base: has_base_data ? base_total_branches_coverage_percent_raw : null,
        diff: has_base_data
          ? total_branches_coverage_percent_raw - base_total_branches_coverage_percent_raw
          : null,
      },
    },
    {
      type: 'Total Functions Coverage',
      percent: {
        total: total_functions_coverage_percent_raw,
        base: has_base_data ? base_total_functions_coverage_percent_raw : null,
        diff: has_base_data
          ? total_functions_coverage_percent_raw - base_total_functions_coverage_percent_raw
          : null,
      },
    },
    {
      type: 'Total Lines Coverage',
      percent: {
        total: total_lines_coverage_percent_raw,
        base: has_base_data ? base_total_lines_coverage_percent_raw : null,
        diff: has_base_data
          ? total_lines_coverage_percent_raw - base_total_lines_coverage_percent_raw
          : null,
      },
    },
  ];

  const LETTER_LABEL = {
    S: 'Statements',
    B: 'Branches',
    F: 'Functions',
    L: 'Lines',
  };

  const COVERAGE_LEVEL_IMAGE = {
    low: 'https://user-images.githubusercontent.com/11299391/159445221-fe3dc085-8c56-4e03-9642-219784c88fe7.svg',
    medium:
      'https://user-images.githubusercontent.com/11299391/159445212-f135c6d7-f354-4e8c-9a9f-28bb3ff1b7b5.svg',
    high: 'https://user-images.githubusercontent.com/11299391/159445220-d88b3624-0814-4664-80c8-09f0f2b8e68b.svg',
  };

  function formatPercentDiff(percent) {
    if (!Number.isFinite(percent)) {
      return '';
    }

    const roundedPercent = `${Number(percent.toFixed(2))}%`;

    if (percent >= 0) {
      return '+' + roundedPercent;
    }

    return roundedPercent;
  }

  function getCoverageLevelImage(percent) {
    // https://github.com/istanbuljs/istanbuljs/blob/c1559005b3bb318da01f505740adb0e782aaf14e/packages/istanbul-lib-report/lib/watermarks.js
    if (percent >= 80) {
      return COVERAGE_LEVEL_IMAGE.high;
    } else if (percent >= 50) {
      return COVERAGE_LEVEL_IMAGE.medium;
    } else {
      return COVERAGE_LEVEL_IMAGE.low;
    }
  }

  function getFilePrefix() {
    return `../blob/${commit_sha}/`;
  }
</script>

<h2>Coverage Report</h2>

Commit:<a href={commit_link}>{short_commit_sha}</a><br />
Base: <a href={base_commit_link}>{base_ref}@{base_short_commit_sha}</a><br /><br />

<table>
  <thead>
    <th>Type</th>
    {#if has_base_data}
      <th>Base</th>
    {/if}
    <th>This PR</th>
  </thead>
  <tbody>
    {#each summary_list as { type, percent }}
      <tr>
        <td>{type}</td>
        {#if has_base_data}
          <td>
            {#if Number.isFinite(percent.base)}
              <img src={getCoverageLevelImage(percent.base)} alt="" />&nbsp;{percent.base}%
            {:else}
              -
            {/if}
          </td>
        {/if}
        <td>
          {#if Number.isFinite(percent.total)}
            <img src={getCoverageLevelImage(percent.total)} alt="" />&nbsp;{percent.total}%
            {#if has_base_data}
              &nbsp;({formatPercentDiff(percent.diff)})
            {/if}
          {:else}
            -
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<details>
  <summary>Details (changed files):</summary><br />
  <table>
    <thead>
      <th>File</th>
      <th>Statements</th>
      <th>Branches</th>
      <th>Functions</th>
      <th>Lines</th>
    </thead>
    <tbody>
      {#each changed_files_coverage_data as [file, data]}
        {@const percents = [
          data.statements.pct,
          data.branches.pct,
          data.functions.pct,
          data.lines.pct,
        ]}
        <tr>
          <td>
            <a href="{getFilePrefix()}{file}">{file}</a>
          </td>
          {#each percents as percent}
            <td>
              {#if Number.isFinite(percent)}
                <img src={getCoverageLevelImage(percent)} alt="" />&nbsp;{percent}%
              {:else}
                -
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</details>