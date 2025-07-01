import {defineType} from 'sanity'

export const lessons = defineType({
  name: 'lessons',
  title: '📖 Lessons',
  type: 'document',
  fields: [
    {
      name: 'chapter_id',
      title: 'Chapter',
      type: 'reference',
      to: [{type: 'chapters'}],
      description: 'Chapter this lesson belongs to',
    },
    {
      name: 'day_number',
      title: 'Day Number',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1),
      description: 'Unique day number for this lesson',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'Main lesson content',
    },
    {
      name: 'image',
      title: 'Lesson Image',
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
      name: 'reflection_question',
      title: 'Reflection Question',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'Primary reflection question for the lesson',
    },
    {
      name: 'reflection_question_2',
      title: 'Reflection Question 2',
      type: 'text',
      description: 'Optional second reflection question',
    },
    {
      name: 'reflection_question_3',
      title: 'Reflection Question 3',
      type: 'text',
      description: 'Optional third reflection question',
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
      title: 'Day Number',
      name: 'dayNumberAsc',
      by: [{field: 'day_number', direction: 'asc'}],
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
      day: 'day_number',
      chapter: 'chapter_id.title',
      chapterNumber: 'chapter_id.chapter_number',
      media: 'image',
    },
    prepare(selection) {
      const {title, day, chapter, chapterNumber, media} = selection
      const chapterInfo = chapter ? `Chapter ${chapterNumber}: ${chapter}` : 'No chapter'
      return {
        title: `Day ${day}: ${title}`,
        subtitle: chapterInfo,
        media,
      }
    },
  },
}) 