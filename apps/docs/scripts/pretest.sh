#!/bin/bash

# Kill anything running on port 4000
lsof -t -i:4000 | xargs -r kill

# Runs a node at port 4000
pnpm fuels node > /dev/null 2>&1 &

# Builds projects
pnpm fuels build

# Deploys projects (needed for loader bytecode)
pnpm fuels deploy

# Kills the node
lsof -t -i:4000 | xargs -r kill