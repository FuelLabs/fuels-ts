version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "sunday"
    open-pull-requests-limit: 5
    labels:
      - "chore"
    commit-message:
      prefix: "build(deps):"
    versioning-strategy: "increase"
    groups:
      deps-major:
        applies-to: "version-updates"
        update-types:
          - "major"
      deps-minor:
        applies-to: "version-updates"
        update-types:
          - "patch"
      deps-patch:
        applies-to: "version-updates"
        update-types:
          - "patch"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "sunday"
    open-pull-requests-limit: 5
    labels:
      - "chore"
    commit-message:
      prefix: "ci(deps):"
