import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    repoUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    order: z.number().default(99),
    publishDate: z.date().optional()
  }),
});

export const collections = {
  projects: projectsCollection,
};
