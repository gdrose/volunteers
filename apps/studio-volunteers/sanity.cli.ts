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
    appId: 'poa43qon28q6d36ts1di4u7b',
    autoUpdates: true,
  },
  // Run `bun run typegen` after schema or query changes; it also marks required fields non-optional.
  typegen: {
    // Queries live in the SvelteKit app; types are generated next to them.
    path: '../web/src/lib/sanity/queries.ts',
    schema: 'schema.json',
    generates: '../web/src/lib/sanity/sanity.types.ts',
    // `@sanity/client` isn't resolvable from apps/web (it comes via @sanity/sveltekit), so
    // queries are typed with the generated *_RESULT types instead of client overloads.
    overloadClientMethods: false,
  },
})
