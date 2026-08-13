import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Project name as it appears on the portfolio (e.g. "Customer Churn Predictor").',
      validation: (Rule) => Rule.required().min(3).max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Auto-generated URL path. Click "Generate" after entering the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: '1–2 lines explaining what the project does and the problem it solves.',
      validation: (Rule) => Rule.required().min(20).max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Screenshot or preview image shown on the portfolio card.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'link',
      title: 'Project Link',
      type: 'url',
      description: 'GitHub repo, live demo, or any public project URL.',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Technologies used — e.g. Python, TensorFlow, React, SAP.',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order on the portfolio page. 1 appears first.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
});
