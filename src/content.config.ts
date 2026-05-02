import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/works' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    cover: image(),
    tags: z.array(z.string()).default([]),
    medium: z.enum(['photo', 'video', 'graphic', 'code', 'mixed']),
    video: z.object({
      provider: z.enum(['youtube', 'vimeo']),
      id: z.string(),
    }).optional(),
    links: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
      kind: z.enum(['github', 'drive', 'dropbox', 'site', 'other']).default('other'),
    })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { works };
