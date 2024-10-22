import fs from 'fs';

import {
  checkAndLoadCache,
  FUELS_VERSION_CACHE_FILE,
  FUELS_VERSION_CACHE_TTL,
  saveToCache,
} from './fuelsVersionCache';

const mockWriteFile = () => vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

const mockFileAge = (createdAtMs: number) =>
  // @ts-expect-error type mismatch for mtimeMs
  vi.spyOn(fs, 'statSync').mockReturnValue({ mtimeMs: createdAtMs });

const mockReadFile = (content: string) => vi.spyOn(fs, 'readFileSync').mockReturnValue(content);

const mockFileExists = (exists: boolean) => vi.spyOn(fs, 'existsSync').mockReturnValue(exists);

/**
 * @group node
 */
describe('fuelsVersionCache', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('saveToCache', () => {
    const version = '0.1.0';

    const writeFileMock = mockWriteFile();

    saveToCache(version);

    // Assert that writeFileSync was called
    expect(writeFileMock).toHaveBeenCalledWith(FUELS_VERSION_CACHE_FILE, version, 'utf-8');
  });

  test('checkAndLoadCache - when cache exists', () => {
    mockFileExists(true);
    const version = '0.1.0';

    const readFileMock = mockReadFile(version);

    mockFileAge(Date.now() - 120000); // 2 minutes ago

    const result = checkAndLoadCache();

    expect(readFileMock).toHaveBeenCalledWith(FUELS_VERSION_CACHE_FILE, 'utf-8');
    expect(result).toEqual(version);
  });

  test('checkAndLoadCache - when cache file does not exist', () => {
    mockFileExists(false);

    const result = checkAndLoadCache();

    expect(result).toBeNull();
  });

  test('checkAndLoadCache - when cache file is empty', () => {
    mockFileExists(true);
    mockReadFile('');

    const result = checkAndLoadCache();

    expect(result).toBeNull();
  });

  test('checkAndLoadCache - when cache is too old', () => {
    mockFileExists(true);
    const version = '0.1.0';
    const readFileMock = mockReadFile(version);

    mockFileAge(Date.now() - FUELS_VERSION_CACHE_TTL - 1);

    const result = checkAndLoadCache();

    expect(readFileMock).toHaveBeenCalledWith(FUELS_VERSION_CACHE_FILE, 'utf-8');
    expect(result).toBeNull();
  });
});
