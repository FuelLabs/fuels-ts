import { execSync } from "child_process";

const { log } = console;

/**
 * Flag for debugging
 *
 * - `true` will delete the files
 * - `false` will print the files
 */
const SHOULD_DELETE = true;

/**
 * Various variables for the command
 */
const guideFileDir = "./src/guide";
const testFileSuffix = "*.test.ts";
const printOrDelete = SHOULD_DELETE ? "delete" : "print";

// The command to find the files (and either delete or print them)
const command = `find ${guideFileDir} -type f -name "${testFileSuffix}" -${printOrDelete}`;

// Execute the command
const output = execSync(command);

// Log the output
log(output.toString());
