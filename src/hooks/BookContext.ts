import { Book } from '@/types'
import { createContext } from 'react'

export const BookContext = createContext<Book | undefined>(undefined)

export const BodyContext = createContext<DocumentFragment | undefined>(
  undefined
)
