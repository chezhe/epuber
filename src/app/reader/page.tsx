'use client'

import { Spinner, Text, VStack } from '@chakra-ui/react'
import ToolBar from './ToolBar'
import { parseEpub } from './epub-parser'
import { useEffect, useState } from 'react'
import { Book, Chapter } from '@/types'
import RawRender from './Render/RawRender'
import { useSearchParams } from 'next/navigation'
import books from '@/utils/sample.json'
import { BookContext } from '@/hooks/BookContext'

export default function Reader() {
  const [book, setBook] = useState<Book>()
  const [activeChapter, setActiveChapter] = useState<Chapter>()
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      const book = await parseEpub(file)
      console.log('book', book)

      setBook(book as Book)
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
        fetch(bk.file)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], bk.title)
            parseEpub(file).then((book) => {
              setBook(book as Book)
              setActiveChapter(book.chapters[0])
            })
          })
          .catch(console.error)
      }
    }
  }, [bookName])

  return (
    <BookContext.Provider value={book}>
      <VStack h="100vh" gap={0}>
        <ToolBar
          book={book}
          activeChapter={activeChapter}
          setActiveChapter={setActiveChapter}
        />
        {activeChapter ? (
          <RawRender
            activeChapter={activeChapter}
            setActiveChapter={setActiveChapter}
            book={book}
          />
        ) : (
          <VStack pt={16}>
            <Spinner size={'lg'} />
            <Text>LOADING...</Text>
          </VStack>
        )}
      </VStack>
    </BookContext.Provider>
  )
}
