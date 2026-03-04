import { spawnSync } from 'child_process';
import { join } from 'path';

import { rewriteTemplateFiles } from '../src/lib/rewriteTemplateFiles';
import { templates } from '../src/lib/setupProgram';

// Copy over the workspace templates
const workspaceDir = join('../..');
const workspaceTemplates = join(workspaceDir, 'templates');
spawnSync('cp', ['-r', workspaceTemplates, '.'], { stdio: 'inherit' });

// Rewrite the template files
for (const template of templates) {
  const templateDir = join(__dirname, '../templates', template);
  rewriteTemplateFiles(templateDir);
}
