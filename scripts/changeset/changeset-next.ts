import { writeFileSync } from 'node:fs';

const output = `---\n"fuels": patch\n---\n\nincremental\n`;
writeFileSync('.changeset/fuel-labs-ci.md', output);
