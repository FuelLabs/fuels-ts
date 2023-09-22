import { saveContractIds } from './saveContractIds';

jest.mock('fs/promises', () => {
  const original = jest.requireActual('fs/promises');
  return {
    ...original,
    writeFile: jest.fn().mockResolvedValue(null),
    mkdir: jest.fn().mockResolvedValue(null),
  };
});

describe('Utils saveContractIds', () => {
  it('Should create folder and save file with expected format', async () => {
    await saveContractIds(
      [
        {
          name: 'foo',
          contractId: '0x01',
        },
        {
          name: 'bar',
          contractId: '0x02',
        },
      ],
      '/root/output'
    );
    const { writeFile, mkdir } = jest.requireMock('fs/promises');

    expect(writeFile).toHaveBeenCalledWith(
      '/root/output/contracts.json',
      JSON.stringify(
        {
          foo: '0x01',
          bar: '0x02',
        },
        null,
        2
      )
    );
    expect(mkdir).toHaveBeenCalledWith('/root/output', {
      recursive: true,
    });
  });
});
