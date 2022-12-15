There are two parts to the fuels-ts repository documentation

## Part One: Typedoc
[typedoc](https://typedoc.org/) does the work of gathering all types, functions, classes, etc. from all of our source code. It will read through the `packages` folder and collect all that information and convert it into a markdown file, modifying the contents of [`docs/packages`](https://github.com/FuelLabs/fuels-ts/tree/master/docs/packages).

Furthermore, I've enhanced typedoc to also build out the [Guide documentation](https://fuellabs.github.io/fuels-ts/guide/) with a custom plugin called  `typedoc-plugin-guide-builder` that's in our [repo here](https://github.com/FuelLabs/fuels-ts/tree/master/scripts/typedoc-plugin-guide-builder) (We should move this to a standalone plugin later on). This portion of the typedoc process takes source files from [`docs/_guide`](https://github.com/FuelLabs/fuels-ts/tree/master/docs/_guide), runs them through the plugins and renders code snippets pulled from source code.  

#### How does the `typedoc-plugin-guide-builder` plugin work? 
See how this markdown document refers to [Sway](https://github.com/FuelLabs/fuels-ts/blob/master/docs/_guide/testing/testing-with-jest.md?plain=1#L6) and [TypeScript](https://github.com/FuelLabs/fuels-ts/blob/master/docs/_guide/testing/testing-with-jest.md?plain=1#L9) code (also note the language hints like `[@code:rust]`, and then see how [reference in the TypeScript code](https://github.com/FuelLabs/fuels-ts/blob/master/packages/example-contract/src/example-contract.test.ts#L1) is written

It writes the final results to [`docs/guide`](https://github.com/FuelLabs/fuels-ts/tree/master/docs/guide).

### Intermission: Repo
Once typedoc is done generating the markdown docs, the data inside `docs/packages` and `docs/guide` are highly useful. These are complete docs that are checked into the repo and can be found alongside the code for TS-SDK consumers. **One could view and use them just fine inside GitHub file browser or locally within their own filesystem.**

## Part Two: Jekyll
[jekyll](https://jekyllrb.com/) does the work of rendering the docs in markdown into something the browser understands: HTML. There are currently some [open issues to possibly switch off Jekyll](https://github.com/FuelLabs/fuels-ts/issues/457). We shall see, but [GitHub pages uses Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll) so its the easy choice for now.

Anyways, Jekyll is configured with the [just the docs](https://github.com/just-the-docs/just-the-docs) theme (actually a modified version of it [found here within Fuels org](https://github.com/FuelLabs/typedoc-just-the-docs-theme)). The only interesting thing to point out here is also that we [update this file _data/versions.yml](https://github.com/FuelLabs/fuels-ts/blob/master/docs/_data/versions.yml) on each successful build to master, so that the versions rendered in the docs are accurate relative to the repo's versions.

## Finale: CI
Our build tools in CI automatically update the docs inside the repo after a successful new build hits the `master` branch. This is accomplished by the [GitHub action](https://github.com/FuelLabs/fuels-ts/blob/master/.github/workflows/release.yaml#L48) that calls `pnpm changeset:version-with-docs` which runs [this script to rebuild docs and commit](https://github.com/FuelLabs/fuels-ts/blob/master/scripts/changeset-version-with-docs.ts) them into the repo (see[ sample commit here](https://github.com/FuelLabs/fuels-ts/pull/669/commits/8fc3bb1eea57e73139965cf32f36b24537df4906)) as part of the [final update PR](https://github.com/FuelLabs/fuels-ts/pull/669).

## TLDR: Local docs development
#### 1. The one-time local setup for the custom plugin `typedoc-plugin-guide-builder` is to compile the Typescript, do
```bash
# start in root of project
cd ./scripts/typedoc-plugin-guide-builder
tsc
```

#### 2. Next, you'll want to rebuild the generated typedoc files (see Part One above to understand why)
```bash
# start in root of project
pnpm typedoc

# if you plan to make a lot of updates, use `watch`
pnpm typedoc --watch
```

#### 3. Finally, if you want to see how the docs will appear fully rendered as they do [on the docs website](https://fuellabs.github.io/fuels-ts/), you will need to run Jekyll (see Part Two above to understand why). [Setup Jekyll here](https://jekyllrb.com/docs/) if you haven't already.
```bash
# start in root of project
cd docs

# this will automatically `watch`, note that the initial build and "updates" can take several seconds/minutes
bundle exec jekyll serve
```