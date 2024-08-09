import { randomUUID } from '..';

/**
 * @group node
 * @group browser
 */
describe('randomUUID', () => {
  const UUID_V4_REGEX =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-4[0-9a-fA-F]{3}\b-[89ABab][0-9a-fA-F]{3}\b-[0-9a-fA-F]{12}$/;

  it('generates a V4 UUID', () => {
    const uuidV4 = randomUUID();
    expect(uuidV4).toMatch(UUID_V4_REGEX);
  });
});
