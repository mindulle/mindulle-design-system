import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';

const ARCHETYPES = ['landing', 'component', 'foundation', 'guide'] as const;
type DocArchetype = (typeof ARCHETYPES)[number];
type BaseFrontmatter = typeof frontmatterSchema['_output'];

const docsFrontmatterSchema = {
  '~standard': {
    version: 1 as const,
    vendor: 'mindulle-docs',
    types: {} as {
      input: BaseFrontmatter & { archetype: DocArchetype };
      output: BaseFrontmatter & { archetype: DocArchetype };
    },
    validate(value: unknown) {
      const base = frontmatterSchema['~standard'].validate(value);
      if (base instanceof Promise) {
        throw new Error('Async frontmatter validation is not supported');
      }
      if (base.issues) return base;

      const raw = (value ?? {}) as Record<string, unknown>;
      const archetype = raw.archetype;
      if (typeof archetype !== 'string' || !ARCHETYPES.includes(archetype as DocArchetype)) {
        return {
          issues: [
            {
              message: `archetype must be one of: ${ARCHETYPES.join(', ')}`,
              path: ['archetype'],
            },
          ],
        };
      }

      return {
        value: {
          ...(base.value as BaseFrontmatter),
          archetype: archetype as DocArchetype,
        },
      };
    },
  },
};

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: docsFrontmatterSchema,
  },
});

export default defineConfig();
