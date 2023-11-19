import * as ethers from 'ethers';
import * as fs from 'fs';
import * as path from 'path';

import {
  getForcProject,
  getProjectAbiPath,
  getProjectBinPath,
  getProjectDebugDir,
  getProjectNormalizedName,
  getProjectStorageSlots,
  getProjectStorageSlotsPath,
  getProjectTempDir,
} from './getForcProject';

jest.mock('path', () => ({
  __esModule: true,
  ...jest.requireActual('path'),
}));

jest.mock('fs', () => ({
  __esModule: true,
  ...jest.requireActual('fs'),
}));

describe('getForcProject', () => {
  afterEach(jest.restoreAllMocks);

  it('should return the correct temporary directory path on getProjectTempDir', () => {
    const params = { projectDir: '/path/to/project', projectName: 'myProject' };
    const expectedPath = '/path/to/project/out/debug/__temp__';

    jest.spyOn(path, 'join').mockImplementation((...segments) => segments.join('/'));

    const tempDir = getProjectTempDir(params);

    expect(tempDir).toEqual(expectedPath);
  });

  it('should return the correct ABI file path on getProjectAbiPath', () => {
    const params = { projectDir: '/path/to/project', projectName: 'myProject' };
    const expectedPath = '/path/to/project/out/debug/myProject-abi.json';

    jest.spyOn(path, 'join').mockImplementation((...segments) => segments.join('/'));

    const abiPath = getProjectAbiPath(params);

    expect(abiPath).toEqual(expectedPath);
  });

  it('should return the correct binary file path on getProjectBinPath', () => {
    const params = { projectDir: '/path/to/project', projectName: 'myProject' };
    const expectedPath = '/path/to/project/out/debug/myProject.bin';

    jest.spyOn(path, 'join').mockImplementation((...segments) => segments.join('/'));

    const binPath = getProjectBinPath(params);

    expect(binPath).toEqual(expectedPath);
  });

  it('should return the correct storage slots file path on getProjectStorageSlotsPath', () => {
    const params = { projectDir: '/path/to/project', projectName: 'myProject' };
    const expectedPath = '/path/to/project/out/debug/myProject-storage_slots.json';

    jest.spyOn(path, 'join').mockImplementation((...segments) => segments.join('/'));

    const storageSlotsPath = getProjectStorageSlotsPath(params);

    expect(storageSlotsPath).toEqual(expectedPath);
  });

  it('should return a normalized project name on getProjectNormalizedName', () => {
    const params = { projectDir: '/path/to/project', projectName: 'My Project' };
    const expectedName = 'MyProject';

    const normalizedName = getProjectNormalizedName(params);

    expect(normalizedName).toEqual(expectedName);
  });

  it('should return the storage slots if file exists on getProjectStorageSlots', () => {
    const params = { projectDir: '/path/to/project', projectName: 'myProject' };
    const expectedPath = '/path/to/project/out/debug/myProject-storage_slots.json';
    const fakeStorageSlots = [{ key: 'key1', value: 'value1' }];

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    const readFileSyncSpy = jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue(JSON.stringify(fakeStorageSlots));

    const storageSlots = getProjectStorageSlots(params);

    expect(storageSlots).toEqual(fakeStorageSlots);
    expect(readFileSyncSpy).toHaveBeenCalledWith(expectedPath, 'utf-8');
  });

  it('should return the correct debug directory path', () => {
    const joinSpy = jest
      .spyOn(path, 'join')
      .mockImplementation((...segments) => segments.join('/'));

    const params = { projectDir: '/path/to/project', projectName: 'myProject' };
    const expectedPath = '/path/to/project/out/debug';

    const debugDir = getProjectDebugDir(params);

    expect(debugDir).toEqual(expectedPath);
    expect(joinSpy).toHaveBeenCalledWith(params.projectDir, 'out', 'debug');
  });

  it('should return an empty array if the storage slots file does not exist', () => {
    const params = { projectDir: '/path/to/project', projectName: 'myProject' };

    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync');

    const storageSlots = getProjectStorageSlots(params);

    expect(storageSlots).toEqual([]);
    expect(readFileSyncSpy).not.toHaveBeenCalled();
  });

  it('should return the correct ForcProject structure', () => {
    const fakeBinContent = 'binary content';
    const fakeAbiContent = { contracts: {} };
    const fakeStorageSlots = [{ key: 'key1', value: 'value1' }];

    jest.spyOn(ethers, 'hexlify').mockImplementation((param) => param as string);
    jest.spyOn(path, 'join').mockImplementation((...segments) => segments.join('/'));
    jest.spyOn(fs, 'readFileSync').mockImplementation((pathParam) => {
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

    jest
      .spyOn(fs, 'existsSync')
      .mockImplementation((pathParam) => (<string>pathParam).endsWith('-storage_slots.json'));

    const forcProject = {
      projectDir: 'fuel_gauge',
      projectName: 'myProject',
    };

    const project = getForcProject(forcProject);

    expect(project.name).toEqual(forcProject.projectName);
    expect(project.debugDir).toContain('fuel_gauge/out/debug');
    expect(project.binPath).toContain('/myProject.bin');
    expect(project.binHexlified).toBeDefined();
    expect(project.abiPath).toContain('/myProject-abi.json');
    expect(project.abiName).toEqual('myProject-abi');
    expect(project.abiContents).toEqual(fakeAbiContent);
    expect(project.normalizedName).toBeDefined();
    expect(project.storageSlots).toEqual(fakeStorageSlots);
  });
});
