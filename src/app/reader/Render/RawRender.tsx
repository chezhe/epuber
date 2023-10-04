import { Book, Chapter } from '@/types'
import { Box } from '@chakra-ui/react'
import { XMLParser } from 'fast-xml-parser'
import RawNode from './RawNode'
import { parse, parseFragment } from 'parse5'
import { useEffect } from 'react'

export default function RawRender({
  activeChapter,
  book,
  setActiveChapter,
}: {
  activeChapter?: Chapter
  book?: Book
  setActiveChapter: (chapter: Chapter | undefined) => void
}) {
  useEffect(() => {
    document.getElementById('reader-wrap')?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [activeChapter?.src])

  if (!activeChapter?.content) {
    return null
  }
  const bodyHtml = /<body.*?>([\s\S]*)<\/body>/.exec(
    activeChapter?.content ?? ''
  )?.[1]
  const body = parseFragment(bodyHtml ?? '')
  console.log('body', body)

  return (
    <Box
      id="reader-wrap"
      w="100%"
      p={8}
      px={16}
      fontSize={24}
      overflowY={'scroll'}
      lineHeight={2}
    >
      <RawNode nodes={body.childNodes} />
    </Box>
  )
}
