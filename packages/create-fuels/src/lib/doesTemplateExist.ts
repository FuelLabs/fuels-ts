import type { Template } from './setupProgram';
import { templates } from './setupProgram';

export const doesTemplateExist = (templateName: Template): boolean => templates.has(templateName);
