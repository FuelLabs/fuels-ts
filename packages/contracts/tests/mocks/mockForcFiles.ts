import { forcFiles } from '../../src/services';

export function mockForcFiles() {
  forcFiles.set('/root/project/Forc.toml', {
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
  forcFiles.set('/root/project/foo/Forc.toml', {
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
  forcFiles.set('/root/project/bar/Forc.toml', {
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
  forcFiles.set('/root/project/predicate/Forc.toml', {
    project: {
      name: 'predicate',
      authors: ['Bar'],
      entry: 'main.sw',
      license: 'MIT',
    },
    dependencies: {},
    workspace: {
      members: [],
    },
  });
  forcFiles.set('/root/project/script/Forc.toml', {
    project: {
      name: 'script',
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
