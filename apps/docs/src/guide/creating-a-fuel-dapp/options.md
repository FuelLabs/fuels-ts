<script setup>
  import { data } from '../../versions.data'
  const { fuels } = data
</script>

# Options

The `npm create fuels` command has several command-line options that you can use to customize your project.

::: code-group

```sh-vue [pnpm]
pnpm create fuels@{{fuels}} [project-name] [options]
```

```sh-vue [npm]
npm create fuels@{{fuels}} -- [project-name] [options]
```

```sh-vue [bun]
bun create fuels@{{fuels}} [project-name] [options]
```

:::

## `--template <template-name>`

Specifies the template to use for your project. The available templates are: `vite` and `nextjs`. The default template is `vite`.

## `--verbose`

Enables verbose logging. Useful when debugging issues with the tool.

## `-h, --help`

Displays a help message with all available options.

## `-V, --version`

Displays the version number of the `npm create fuels` command.
