import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Company / Organisation',
      type: 'string',
      description: 'Name of the company or organisation (e.g. Saint-Gobain, MUN Society).',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'position',
      title: 'Position / Role',
      type: 'string',
      description: 'Your job title or role (e.g. SAP SD Intern, General Secretary).',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Auto-generated from position. Click "Generate" after filling the role.',
      options: { source: 'position', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      description: 'When you started this role. Day is ignored — only month and year are displayed.',
      options: { dateFormat: 'YYYY-MM' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'When this role ended. Leave blank if this is a current position.',
      options: { dateFormat: 'YYYY-MM' },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: '2–4 lines covering your responsibilities, achievements, and impact.',
      validation: (Rule) => Rule.required().min(30).max(600),
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Skills',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Skills or areas involved — e.g. Leadership, SAP SD, Configuration, Python.',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Company logo or photo shown on the right side of the experience card.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls sort order. 1 = most recent / most prominent.',
    }),
  ],
  preview: {
    select: { title: 'position', subtitle: 'company' },
  },
});
