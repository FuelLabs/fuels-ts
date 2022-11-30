import { join } from 'path';

const hbsDir = join(__dirname, '..', 'hbs');

export const templatePaths = {
  _header: join(hbsDir, '_header.hbs'),
  dts: join(hbsDir, 'dts.hbs'),
  common: join(hbsDir, 'common.hbs'),
  factory: join(hbsDir, 'factory.hbs'),
  index: join(hbsDir, 'index.hbs'),
};
