import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { projectId, dataset, apiVersion } from './sanity/env';
import project from './sanity/schemas/project';
import post from './sanity/schemas/post';
import experience from './sanity/schemas/experience';

export default defineConfig({
  name: 'rafa-portfolio',
  title: 'Rafa Portfolio',
  projectId,
  dataset,
  apiVersion,
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [project, post, experience],
  },
});
