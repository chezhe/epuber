export interface Metadata {
  title: string
  author: string[]
  publisher?: string[]
  language?: string[]
  description?: string
  rights?: string
}

export interface Chapter {
  title: string
  src: string
  playOrder: number
  content: string
  chapters?: Chapter[]
}

export interface Book {
  metadata?: Metadata
  chapters: Chapter[]
  images: { key: string; url: string }[]
}

export interface SQLBook {
  id: number
  title: string
  author: string[]
  publisher?: string[]
  language?: string[]
  file: string
  cover: string
  description?: string
  rights?: string
}

export enum SubEvent {
  REFRESH_BOOKS = 'REFRESH_BOOKS',
}
