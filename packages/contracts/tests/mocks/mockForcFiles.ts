import { forcFiles } from '../../src/services';

export function mockForcFiles() {
  forcFiles.set('/root/contracts/Forc.toml', {
    project: {
      name: '',
      authors: [],
      entry: '',
      license: '',
    },
    dependencies: {},
    workspace: {
      members: ['contracts'],
    },
  });
  forcFiles.set('/root/contracts/foo/Forc.toml', {
    project: {
      name: 'foo_bar',
      authors: ['Foo'],
      entry: 'main.sw',
      license: 'MIT',
    },
    dependencies: {},
    workspace: {
      members: [],
    },
  });
  forcFiles.set('/root/contracts/bar/Forc.toml', {
    project: {
      name: 'bar_foo',
      authors: ['Bar'],
      entry: 'main.sw',
      license: 'MIT',
    },
    dependencies: {},
    workspace: {
      members: [],
    },
  });
}
