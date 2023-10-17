import { SQLBook, SubEvent } from '@/types'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useEffect } from 'react'
import * as PubSub from 'pubsub-js'

const booksAtom = atomWithStorage<SQLBook[]>('books', [])
export default function useBooks() {
  const [books, setBooks] = useAtom(booksAtom)

  useEffect(() => {
    async function fetchBooks() {
      fetch('/api/books/list')
        .then((res) => res.json())
        .then((res) => {
          const books = res.map((b: any) => ({
            ...b,
            author: JSON.parse(b.author),
            publisher: JSON.parse(b.publisher),
            language: JSON.stringify(b.language),
          }))
          setBooks(books)
        })
        .catch((err) => console.log(err))
    }

    fetchBooks()

    const listner = PubSub.subscribe(SubEvent.REFRESH_BOOKS, fetchBooks)

    return () => {
      PubSub.unsubscribe(listner)
    }
  }, [])

  return books
}
