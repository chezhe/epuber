import { Chapter } from '@/types'
// @ts-ignore
import type { DocumentFragment } from 'parse5/dist/tree-adapters/default.d.ts'

export function findAnchorTarget(body: DocumentFragment, id: string) {
  const items: DocumentFragment.ChildNode[] = Array.from(body.childNodes)
  for (let index = 0; index < items.length; index++) {
    if (items[index].nodeName !== 'p') {
      continue
    }
    const hasAnchor = Array.from(items[index].childNodes).some(
      (node: DocumentFragment.ChildNode) => {
        const _id = node.attrs?.find((attr: any) => attr.name === 'id')?.value
        return node.nodeName === 'a' && _id === id
      }
    )
    if (hasAnchor) {
      return items[index]
    }
  }
  return null
}

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
