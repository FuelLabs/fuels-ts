## Docs

To run locally follow:

[Test site locally with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)

Or:

### Install dependencies

```sh
bundle install
```

### Run serve

```sh
JEKYLL_GITHUB_TOKEN=<GH_TOKEN> bundle exec jekyll serve
```

Replace the `GH_TOKEN` with a [GitHub Personal Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token), with just `public_repo` selected.
