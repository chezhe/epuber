import { Book, Chapter } from '@/types'
import { Box } from '@chakra-ui/react'
import { XMLParser } from 'fast-xml-parser'
import RawNode from './RawNode'

const parser = new XMLParser({
  ignoreAttributes: false,
  ignorePiTags: false,
  // preserveOrder: true,
  unpairedTags: ['hr', 'br', 'link', 'meta'],
  stopNodes: ['*.pre', '*.script'],
  processEntities: true,
  htmlEntities: true,
  trimValues: true,
  removeNSPrefix: true,
  allowBooleanAttributes: true,
})

export default function RawRender({
  activeChapter,
  book,
}: {
  activeChapter?: Chapter
  book?: Book
}) {
  if (!activeChapter?.content) {
    return null
  }
  const { html } = parser.parse(activeChapter?.content ?? '')

  return (
    <Box
      id="reader-wrap"
      w="100%"
      p={8}
      fontSize={24}
      overflowY={'scroll'}
      lineHeight={2}
    >
      <RawNode tagName={'body'} node={html?.body} />
    </Box>
  )
}
