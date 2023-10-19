import { Book, Chapter } from '@/types'
import { Box } from '@chakra-ui/react'
import RawNode from './RawNode'
import { parseFragment, parse } from 'parse5'
import { useEffect, useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import sanitizeHtml from 'sanitize-html'
import { useTextSelection } from 'use-text-selection'
import Tools from './Tools'
import { BodyContext } from '@/hooks/BookContext'

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
  const { isCollapsed } = useTextSelection()

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

  const { scrollYProgress } = useScroll({
    container: scrollRef,
  })

  return (
    <BodyContext.Provider value={body as any}>
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
        <RawNode nodes={body.childNodes} />
        {isCollapsed === false && <Tools />}
        <motion.div
          className="progress-bar"
          viewport={{ root: scrollRef }}
          style={{ scaleX: scrollYProgress }}
        />
      </Box>
    </BodyContext.Provider>
  )
}
