import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'competency',
  title: 'Competency',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'number',
    }),
    defineField({
      name: 'improvement',
      title: 'Improvement',
      type: 'boolean',
    }),
  ],
})
