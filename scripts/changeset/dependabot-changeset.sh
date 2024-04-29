#!/bin/bash

# Get the latest commit hash on the current branch
latest_commit=$(git rev-parse HEAD)

# Get the list of changed package directories
changed_packages=$(git diff-tree --no-commit-id --name-only -r "$latest_commit" | grep "packages/" | sed -E 's|packages/([^/]+)/.*|\1|')

# Get the pull request title
pr_title=$(git log -1 --pretty=%B "$latest_commit" | head -n 1)

# Create the changeset content
changeset_content="---\n"
for package in $changed_packages; do
  package_name=$(jq -r '.name' "packages/$package/package.json")
  changeset_content+="\"$package_name\": patch\n"
done
changeset_content+="---\n\n"

# Append the pull request title to the changeset content
changeset_content+="$pr_title"

# Create a new changeset file using pnpm
pnpm changeset add --empty

# Find the newly created changeset file
changeset_file=$(git status --porcelain .changeset/*.md | sed -E 's/.*(\.changeset\/.*\.md)/\1/')
echo "$changeset_file"

# Write the changeset content to the file
echo -e "$changeset_content" > "$changeset_file"