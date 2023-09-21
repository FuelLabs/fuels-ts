import { parsedFuelsConfig } from '../../../tests/fixtures/parsed-fuels-config';

import { flow } from './flow';

jest.mock('./build', () => ({
  build: jest.fn(),
}));
jest.mock('./deploy', () => ({
  deploy: jest.fn(),
}));
jest.mock('./types', () => ({
  types: jest.fn(),
}));

describe('Run Action', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call build, deploy and types', async () => {
    await flow({
      ...parsedFuelsConfig,
      basePath: '/root',
      workspace: '/root/project',
      contracts: ['/root/project/foo', '/root/project/bar'],
      predicates: [],
      scripts: [],
      output: '/root/types',
    });

    const mockBuild = jest.requireMock('./build');
    const mockDeploy = jest.requireMock('./deploy');
    const mockTypes = jest.requireMock('./types');

    expect(mockBuild.build).toHaveBeenCalledTimes(1);
    expect(mockDeploy.deploy).toHaveBeenCalledTimes(1);
    expect(mockTypes.types).toHaveBeenCalledTimes(1);
  });
});
