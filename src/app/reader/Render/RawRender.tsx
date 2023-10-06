import { Book, Chapter } from '@/types'
import { Box } from '@chakra-ui/react'
import RawNode from './RawNode'
import { parseFragment } from 'parse5'
import { useEffect, useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import sanitizeHtml from 'sanitize-html'

export default function RawRender({
  activeChapter,
  book,
  setActiveChapter,
}: {
  activeChapter?: Chapter
  book?: Book
  setActiveChapter: (chapter: Chapter | undefined) => void
}) {
  const scrollRef = useRef(null)

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
  const body = parseFragment(sanitizeHtml(bodyHtml ?? ''))
  console.log('body', body)

  const { scrollYProgress } = useScroll({
    container: scrollRef,
  })

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
      <motion.div
        className="progress-bar"
        viewport={{ root: scrollRef }}
        style={{ scaleX: scrollYProgress }}
      />
      <RawNode nodes={body.childNodes} />
    </Box>
  )
}
