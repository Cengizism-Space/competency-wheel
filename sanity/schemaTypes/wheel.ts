import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'wheel',
  title: 'Wheel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 128,
      },
    }),
    defineField({
      name: 'template',
      title: 'Template',
      type: 'boolean',
    }),
    defineField({
      name: 'competencies',
      title: 'Competencies',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'competency' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
