import { Chapter } from '@/types'

export function findChapter(chapters: Chapter[], src: string) {
  let c = null

  for (let index = 0; index < chapters.length; index++) {
    const chapter = chapters[index]
    if (chapter.src === src) {
      c = chapter
      break
    }
    if (chapter.chapters) {
      for (let index = 0; index < chapter.chapters.length; index++) {
        const _chapter = chapter.chapters[index]
        if (_chapter.src === src) {
          c = _chapter
          break
        }
      }
    }
  }

  return c
}
