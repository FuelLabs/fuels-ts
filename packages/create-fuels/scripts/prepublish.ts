import { spawnSync } from 'child_process';
import { join } from 'path';

import { rewriteTemplateFiles } from '../src/lib/rewriteTemplateFiles';

// Copy over the workspace templates
const workspaceDir = join('../..');
const workspaceTemplates = join(workspaceDir, 'templates');
spawnSync('cp', ['-r', workspaceTemplates, '.'], { stdio: 'inherit' });

// Rewrite the template files
const templateDir = join(__dirname, '../templates/nextjs');
rewriteTemplateFiles(templateDir);
