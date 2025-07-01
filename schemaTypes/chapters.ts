import {defineType} from 'sanity'

export const chapters = defineType({
  name: 'chapters',
  title: '📚 Chapters',
  type: 'document',
  fields: [
    {
      name: 'chapter_number',
      title: 'Chapter Number',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(500),
    },
    {
      name: 'image',
      title: 'Chapter Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    },
    {
      name: 'created_at',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  orderings: [
    {
      title: 'Chapter Number',
      name: 'chapterNumberAsc',
      by: [{field: 'chapter_number', direction: 'asc'}],
    },
    {
      title: 'Created Date',
      name: 'createdDateDesc',
      by: [{field: 'created_at', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      chapter: 'chapter_number',
      description: 'description',
      media: 'image',
    },
    prepare(selection) {
      const {title, chapter, description, media} = selection
      return {
        title: `${chapter}. ${title}`,
        subtitle: description,
        media,
      }
    },
  },
}) 