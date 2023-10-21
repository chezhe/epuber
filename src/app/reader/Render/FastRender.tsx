import { Book, Chapter } from '@/types'
import { Box } from '@chakra-ui/react'
import { XMLParser } from 'fast-xml-parser'
import { useScroll, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import FastNode from './FastNode'

const parser = new XMLParser({
  preserveOrder: true,
  trimValues: true,
  htmlEntities: true,
  ignoreAttributes: false,
  ignorePiTags: true,
  unpairedTags: ['hr', 'br', 'link', 'meta'],
  stopNodes: ['*.pre', '*.script'],
  processEntities: true,
  removeNSPrefix: true,
  allowBooleanAttributes: true,
})

export default function FastRender({
  activeChapter,
  book,
  setActiveChapter,
}: {
  activeChapter?: Chapter
  book?: Book
  setActiveChapter: (chapter: Chapter | undefined) => void
}) {
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    container: scrollRef,
  })
  const [
    {
      html: [_, body],
    },
  ] = parser.parse(activeChapter?.content ?? '')

  useEffect(() => {
    document.getElementById('reader-wrap')?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [activeChapter?.src])

  return (
    <Box
      id="reader-wrap"
      w="100%"
      p={8}
      px={16}
      fontSize={24}
      overflowY={'scroll'}
      lineHeight={2}
      ref={scrollRef}
      zIndex={1000}
    >
      <FastNode nodes={body.body} />
      <motion.div
        className="progress-bar"
        viewport={{ root: scrollRef }}
        style={{ scaleX: scrollYProgress }}
      />
    </Box>
  )
}
