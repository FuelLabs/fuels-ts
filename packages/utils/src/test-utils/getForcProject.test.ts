import * as fs from 'fs';
import * as path from 'path';

import * as utilsMod from '../index';

import {
  getForcProject,
  getProjectAbiPath,
  getProjectBinPath,
  getProjectBuildDir,
  getProjectNormalizedName,
  getProjectStorageSlots,
  getProjectStorageSlotsPath,
  getProjectTempDir,
} from './getForcProject';

vi.mock('path', async () => {
  const mod = await vi.importActual('path');
  return {
    __esModule: true,
    ...mod,
  };
});

vi.mock('fs', async () => {
  const mod = await vi.importActual('fs');
  return {
    __esModule: true,
    ...mod,
  };
});

/**
 * @group node
 */
describe('getForcProject', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each(['debug', 'release'] as const)(
    'should return the correct temporary directory path on getProjectTempDir',
    (build) => {
      const params = { projectDir: '/path/to/project', projectName: 'myProject', build };
      const expectedPath = `/path/to/project/out/${build}/__temp__`;

      vi.spyOn(path, 'join').mockImplementation((...segments) => segments.join('/'));

      const tempDir = getProjectTempDir(params);

      expect(tempDir).toEqual(expectedPath);
    }
  );

  it.each(['debug', 'release'] as const)(
    'should return the correct ABI file path on getProjectAbiPath',
    (build) => {
      const params = { projectDir: '/path/to/project', projectName: 'myProject', build };
      const expectedPath = `/path/to/project/out/${build}/myProject-abi.json`;

      vi.spyOn(path, 'join').mockImplementation((...segments) => segments.join('/'));

      const abiPath = getProjectAbiPath(params);

      expect(abiPath).toEqual(expectedPath);
    }
  );

  it.each(['debug', 'release'] as const)(
    'should return the correct binary file path on getProjectBinPath',
    (build) => {
      const params = { projectDir: '/path/to/project', projectName: 'myProject', build };
      const expectedPath = `/path/to/project/out/${build}/myProject.bin`;

      vi.spyOn(path, 'join').mockImplementation((...segments) => segments.join('/'));

      const binPath = getProjectBinPath(params);

      expect(binPath).toEqual(expectedPath);
    }
  );

  it.each(['debug', 'release'] as const)(
    'should return the correct storage slots file path on getProjectStorageSlotsPath',
    (build) => {
      const params = { projectDir: '/path/to/project', projectName: 'myProject', build };
      const expectedPath = `/path/to/project/out/${build}/myProject-storage_slots.json`;

      vi.spyOn(path, 'join').mockImplementation((...segments) => segments.join('/'));

      const storageSlotsPath = getProjectStorageSlotsPath(params);

      expect(storageSlotsPath).toEqual(expectedPath);
    }
  );

  it.each(['debug', 'release'] as const)(
    'should return a normalized project name on getProjectNormalizedName',
    (build) => {
      const params = { projectDir: '/path/to/project', projectName: 'My Project', build };
      const expectedName = 'MyProject';

      const normalizedName = getProjectNormalizedName(params);

      expect(normalizedName).toEqual(expectedName);
    }
  );

  it.each(['debug', 'release'] as const)(
    'should return the storage slots if file exists on getProjectStorageSlots',
    (build) => {
      const params = { projectDir: '/path/to/project', projectName: 'myProject', build };
      const expectedPath = `/path/to/project/out/${build}/myProject-storage_slots.json`;
      const fakeStorageSlots = [{ key: 'key1', value: 'value1' }];

      vi.spyOn(fs, 'existsSync').mockReturnValue(true);

      const readFileSyncSpy = vi
        .spyOn(fs, 'readFileSync')
        .mockReturnValue(JSON.stringify(fakeStorageSlots));

      const storageSlots = getProjectStorageSlots(params);

      expect(storageSlots).toEqual(fakeStorageSlots);
      expect(readFileSyncSpy).toHaveBeenCalledWith(expectedPath, 'utf-8');
    }
  );

  it.each(['debug', 'release'] as const)(
    'should return the correct debug directory path',
    (build) => {
      const joinSpy = vi
        .spyOn(path, 'join')
        .mockImplementation((...segments) => segments.join('/'));

      const params = { projectDir: '/path/to/project', projectName: 'myProject', build };
      const expectedPath = `/path/to/project/out/${build}`;

      const debugDir = getProjectBuildDir(params);

      expect(debugDir).toEqual(expectedPath);
      expect(joinSpy).toHaveBeenCalledWith(params.projectDir, 'out', build);
    }
  );

  it.each(['debug', 'release'] as const)(
    'should return an empty array if the storage slots file does not exist',
    (build) => {
      const params = { projectDir: '/path/to/project', projectName: 'myProject', build };

      vi.spyOn(fs, 'existsSync').mockReturnValue(false);
      const readFileSyncSpy = vi.spyOn(fs, 'readFileSync');

      const storageSlots = getProjectStorageSlots(params);

      expect(storageSlots).toEqual([]);
      expect(readFileSyncSpy).not.toHaveBeenCalled();
    }
  );

  it.each(['debug', 'release'] as const)(
    'should return the correct ForcProject structure',
    (build) => {
      const fakeBinContent = 'binary content';
      const fakeAbiContent = { contracts: {} };
      const fakeStorageSlots = [{ key: 'key1', value: 'value1' }];

      vi.spyOn(utilsMod, 'hexlify').mockImplementation((param) => param as string);
      vi.spyOn(path, 'join').mockImplementation((...segments) => segments.join('/'));
      vi.spyOn(fs, 'readFileSync').mockImplementation((pathParam) => {
        if ((<string>pathParam).endsWith('.bin')) {
          return fakeBinContent;
        }
        if ((<string>pathParam).endsWith('-abi.json')) {
          return JSON.stringify(fakeAbiContent);
        }
        if ((<string>pathParam).endsWith('-storage_slots.json')) {
          return JSON.stringify(fakeStorageSlots);
        }
        throw new Error('File not found');
      });

      vi.spyOn(fs, 'existsSync').mockImplementation((pathParam) =>
        (<string>pathParam).endsWith('-storage_slots.json')
      );

      const forcProject = {
        projectDir: 'fuel_gauge',
        projectName: 'myProject',
        build,
      };

      const project = getForcProject(forcProject);

      expect(project.name).toEqual(forcProject.projectName);
      expect(project.buildDir).toContain(`fuel_gauge/out/${build}`);
      expect(project.binPath).toContain('/myProject.bin');
      expect(project.binHexlified).toBeDefined();
      expect(project.abiPath).toContain('/myProject-abi.json');
      expect(project.abiName).toEqual('myProject-abi');
      expect(project.abiContents).toEqual(fakeAbiContent);
      expect(project.normalizedName).toBeDefined();
      expect(project.storageSlots).toEqual(fakeStorageSlots);
    }
  );
});
