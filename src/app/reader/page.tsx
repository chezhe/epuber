'use client'

import { HStack, Input, Text, VStack } from '@chakra-ui/react'
import ToolBar from './ToolBar'
import { parseEpub } from './epub-parser'
import { useEffect, useState } from 'react'
import { Book, Chapter } from '@/types'
import MDRender from './Render/MDRender'
import RawRender from './Render/RawRender'
import { useSearchParams } from 'next/navigation'
import books from '@/utils/sample.json'

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

  const query = useSearchParams()
  const bookName = query.get('book')

  useEffect(() => {
    setBook(undefined)
    setActiveChapter(undefined)

    if (bookName) {
      const bk = books.find((b) => b.title === bookName)
      if (bk) {
        console.log('bookName', bookName, bk.file)

        fetch(bk.file)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], bk.title)
            parseEpub(file).then((book) => {
              console.log('book', book)
              setBook(book)
              setActiveChapter(book.chapters[0])
            })
          })
          .catch(console.error)
      }
    }
  }, [bookName])

  return (
    <VStack h="100vh" gap={0}>
      <ToolBar
        book={book}
        activeChapter={activeChapter}
        setActiveChapter={setActiveChapter}
      />
      {activeChapter ? (
        <MDRender
          activeChapter={activeChapter}
          setActiveChapter={setActiveChapter}
          book={book}
        />
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
