'use client'

import { Spinner, Text, VStack } from '@chakra-ui/react'
import ToolBar from './ToolBar'
import { parseEpub } from './epub-parser'
import { useEffect, useState } from 'react'
import { Book, Chapter, SubEvent } from '@/types'
import RawRender from './Render/RawRender'
import { useSearchParams } from 'next/navigation'
import { BookContext } from '@/hooks/BookContext'
import useBooks from '@/hooks/useBooks'
import FastRender from './Render/FastRender'
import * as PubSub from 'pubsub-js'

export default function Reader() {
  const books = useBooks()
  const [book, setBook] = useState<Book>()
  const [activeChapter, setActiveChapter] = useState<Chapter>()

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
              console.log('book parsed', book.chapters[0])
            })
          })
          .catch(console.error)

        if (bk.progress === 0) {
          fetch('/api/books/progress', {
            method: 'POST',
            body: JSON.stringify({
              progress: 1,
              id: bk.id,
            }),
          })
          PubSub.publish(SubEvent.REFRESH_BOOKS)
        }
      }
    }
  }, [bookName, books.length])

  return (
    <BookContext.Provider value={book}>
      <VStack h="100vh" gap={0}>
        <ToolBar
          book={book}
          activeChapter={activeChapter}
          setActiveChapter={setActiveChapter}
        />
        {activeChapter ? (
          <FastRender
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
