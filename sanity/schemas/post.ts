import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The headline of the blog post as it appears in the list.',
      validation: (Rule) => Rule.required().min(5).max(120),
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: '1–2 sentence preview shown in the blog list. Keep it concise and compelling.',
      validation: (Rule) => Rule.required().min(20).max(300),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'Date and time the article was published (or will be published).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediumUrl',
      title: 'Medium URL',
      type: 'url',
      description: 'Full link to the article on Medium (e.g. https://medium.com/@rafa/article-slug).',
      validation: (Rule) =>
        Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Categories for filtering — e.g. SAP, Data Science, AI/ML, Python.',
      options: { layout: 'tags' },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt' },
  },
});
