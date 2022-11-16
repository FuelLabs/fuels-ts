import type { Application } from 'typedoc';
import { ParameterType } from 'typedoc';

import { GuideBuilder } from './guide-builder';
import { defaultOptions, optionsKey } from './guide-builder-options';

/**
 * Load the plugin.
 *
 * @param pluginHost Plugin host to load to.
 */
export function load(pluginHost: Application): void {
  const app = pluginHost.owner;

  pluginHost.options.addDeclaration({
    name: optionsKey,
    help: 'Guide builder plugin options.',
    type: ParameterType.Object,
    defaultValue: defaultOptions,
  });

  new GuideBuilder().initialize(app);
}
