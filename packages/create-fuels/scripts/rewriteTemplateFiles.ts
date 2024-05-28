import { join } from 'path';

import { rewriteTemplateFiles } from '../src/lib/rewriteTemplateFiles';

const templateDir = join(__dirname, '../templates/nextjs');
rewriteTemplateFiles(templateDir);
