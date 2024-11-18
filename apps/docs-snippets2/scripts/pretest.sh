# Check if node is already running at port 4001, if not start it
# TODO: This is a temporary solution to avoid conflicts with the test node in docs-snippets
if ! lsof -t -i:4001 >/dev/null; then
  pnpm fuels node >/dev/null 2>&1 &
fi

# Builds projects
pnpm fuels build

# Deploys projects (needed for loader bytecode)
pnpm fuels deploy

# Checks for type errors
pnpm tsc --noEmit
