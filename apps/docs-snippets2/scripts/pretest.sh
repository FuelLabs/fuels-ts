# Check if node is already running at port 4000, if not start it
if ! lsof -t -i:4000 > /dev/null; then
  pnpm fuels node > /dev/null 2>&1 &
fi

# Builds projects
pnpm fuels build

# Deploys projects (needed for loader bytecode)
pnpm fuels deploy

# Kills the node
lsof -t -i:4000 | xargs -r kill

# Checks for type errors
pnpm tsc --noEmit