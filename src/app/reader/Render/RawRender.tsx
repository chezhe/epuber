import { Book, Chapter } from '@/types'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import RawNode from './RawNode'
import { parseFragment } from 'parse5'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import sanitizeHtml from 'sanitize-html'
import { Highlighter, Languages } from 'lucide-react'
import { useTextSelection } from 'use-text-selection'

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
  const { clientRect, isCollapsed, textContent } = useTextSelection()

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

  console.log('clientRect', clientRect, isCollapsed, textContent)

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
      <RawNode nodes={body.childNodes} />
      {isCollapsed === false && (
        <HStack
          position={'absolute'}
          left={clientRect?.left}
          top={(clientRect?.y ?? 0) + (clientRect?.height ?? 0)}
          bg="red.300"
          p={2}
          px={4}
          gap={4}
          borderRadius={2}
        >
          <Languages size={24} cursor={'pointer'} />
          <Highlighter size={24} cursor={'pointer'} />
        </HStack>
      )}
      <motion.div
        className="progress-bar"
        viewport={{ root: scrollRef }}
        style={{ scaleX: scrollYProgress }}
      />
    </Box>
  )
}
