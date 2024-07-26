import { AbiTypegenProjectsEnum } from '../../../test/fixtures/forc-projects/index';
import { createAbisForTests } from '../../../test/utils/createAbiForTests';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

/**
 * @group node
 */
describe('Configurable.ts', () => {
  it('should get configurable declaration with type', () => {
    const [abi] = createAbisForTests(ProgramTypeEnum.PREDICATE, [
      AbiTypegenProjectsEnum.PREDICATE_WITH_CONFIGURABLE,
    ]);

    const { configurables } = abi;

    expect(configurables.length).toEqual(2);
    const [FEE, ADDRESS] = configurables;

    expect(FEE.name).toEqual('FEE');
    expect(FEE.type.attributes.inputLabel).toEqual('BigNumberish');
    expect(ADDRESS.name).toEqual('ADDRESS');
    expect(ADDRESS.type.attributes.inputLabel).toEqual('string');
  });
});
