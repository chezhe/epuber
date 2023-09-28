'use client'

import { Box, HStack, Heading, Input, Text, VStack } from '@chakra-ui/react'
import ToolBar from './ToolBar'
import { parseEpub } from './epub-parser'
import { useState } from 'react'
import { Book, Chapter } from '@/types'
import Markdown from 'markdown-to-jsx'

export default function Reader() {
  const [book, setBook] = useState<Book>()
  const [activeChapter, setActiveChapter] = useState<Chapter>()
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      const book = await parseEpub(file)
      console.log('book', book)

      setBook(book)
      setActiveChapter(book.chapters[0])
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <VStack h="100vh">
      <ToolBar
        book={book}
        activeChapter={activeChapter}
        setActiveChapter={setActiveChapter}
      />
      {activeChapter ? (
        <Box id="reader-wrap" p={8} fontSize={24}>
          <Markdown
            options={{
              overrides: {
                h1: {
                  component: Heading,
                  props: {
                    textAlign: 'center',
                    lineHeight: 2,
                  },
                },
                p: {
                  component: Text,
                },
                br: {
                  component: () => <Box h={0} />,
                },
              },
            }}
          >
            {activeChapter.content}
          </Markdown>
        </Box>
      ) : (
        <VStack>
          <HStack>
            <Input
              placeholder="Open Your .epub book"
              type="file"
              onChange={onFileChange}
            />
          </HStack>
          <Text fontSize={24}>Sphinx of black quartz, judge my vow</Text>
        </VStack>
      )}
    </VStack>
  )
}
