import { urlJoin } from './url';

/**
 * @group node
*/
describe('urlJoin', () => {
  it('should join paths correctly when baseUrl is provided', () => {
    const baseUrl = 'https://example.com';
    const paths = ['path1', 'path2', 'path3'];
    const result = urlJoin(baseUrl, ...paths);
    expect(result).toBe('https://example.com/path1/path2/path3');
  });

  it('should join paths correctly when baseUrl is not provided', () => {
    const paths = ['path1', 'path2', 'path3'];
    const result = urlJoin(undefined, ...paths);
    expect(result).toBe('path1/path2/path3');
  });

  it('should handle leading slash in baseUrl correctly', () => {
    const baseUrl = '/base';
    const paths = ['path1', 'path2', 'path3'];
    const result = urlJoin(baseUrl, ...paths);
    expect(result).toBe('/base/path1/path2/path3');
  });

  it('should handle empty paths correctly', () => {
    const baseUrl = 'https://example.com';
    const paths: string[] = [];
    const result = urlJoin(baseUrl, ...paths);
    expect(result).toBe('https://example.com');
  });
});