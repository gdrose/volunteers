import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'hkjo1dgo',
    dataset: 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  typegen: {
    enabled: true,
    // Queries live in the SvelteKit app next door; types land inside its `src` so its tsconfig picks them up.
    path: '../web/src/**/*.{ts,svelte}',
    schema: 'schema.json',
    generates: '../web/src/sanity.types.ts',
    overloadClientMethods: true,
  },
})
