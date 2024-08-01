import { doesTemplateExist } from './doesTemplateExist';

/**
 * @group node
 */
test('doesTemplateExist should return true if the template exists', () => {
  expect(doesTemplateExist('nextjs')).toBeTruthy();
});

test('doesTemplateExist should return false if the template does not exist', () => {
  // @ts-expect-error intentionally passing in a non-existent template
  expect(doesTemplateExist('non-existent-template')).toBeFalsy();
});
