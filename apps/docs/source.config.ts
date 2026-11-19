import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';

const ARCHETYPES = ['landing', 'component', 'foundation', 'guide'] as const;
export type DocArchetype = (typeof ARCHETYPES)[number];

type BaseFrontmatter =
  typeof frontmatterSchema extends { '~standard': { types?: { output: infer T } } }
    ? T
    : Record<string, unknown>;

type DocFrontmatter = BaseFrontmatter & { archetype: DocArchetype };

const docsFrontmatterSchema = {
  '~standard': {
    version: 1 as const,
    vendor: 'mindulle-docs',
    types: undefined as unknown as {
      input: DocFrontmatter;
      output: DocFrontmatter;
    },
    async validate(value: unknown) {
      const base = await frontmatterSchema['~standard'].validate(value);
      if (base.issues) return base;

      const raw = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
      const archetype = raw.archetype;
      if (typeof archetype !== 'string' || !(ARCHETYPES as readonly string[]).includes(archetype)) {
        return {
          issues: [
            {
              message: `Invalid or missing "archetype" in frontmatter. Expected one of: ${ARCHETYPES.join(', ')}`,
              path: ['archetype'],
            },
          ],
        };
      }

      return { value: { ...(base.value as BaseFrontmatter), archetype: archetype as DocArchetype } };
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
