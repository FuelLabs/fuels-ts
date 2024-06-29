#!/bin/bash

# Get the first dependabot commit which contains the changed files
first_commit=$(git log master..HEAD --oneline --reverse | xargs | awk '{print $1;}')
echo "First commit: $first_commit"

changed_files=$(git diff-tree --no-commit-id --name-only -r "$first_commit")
echo "changed files: $changed_files"

# Get the list of relevant package.json changes
changed_packages=$(echo "$changed_files" | grep -E "packages/.+/package.json" | xargs jq -r '.name')
changed_templates=$(echo "$changed_files" | grep -E "templates/.+/package.json")

echo "changed packages: $changed_packages"
echo "changed templates: $changed_templates"

# Create the changeset content
changeset_content="---\n"

for package in $changed_packages; do
  changeset_content+="\"$package\": patch\n"
done

# Add create-fuels to changeset
# if a template changed and create-fuels isn't in the changeset already
if [[ -n "$changed_templates" && "${changed_packages}" != *"create-fuels"* ]]; then
  changeset_content+="\"create-fuels\": patch\n"
fi

changeset_content+="---\n\n"

# Append the pull request title to the changeset content
echo "PR_TITLE: $PR_TITLE"
changeset_content+="$PR_TITLE"

# Create a new changeset file using pnpm
pnpm changeset add --empty

# Find the newly created changeset file
changeset_file=$(git status --porcelain .changeset/*.md | sed -E 's/.*(\.changeset\/.*\.md)/\1/')
echo "$changeset_file"

# Write the changeset content to the file
echo -e "$changeset_content" >"$changeset_file"
