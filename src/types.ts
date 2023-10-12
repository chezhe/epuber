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

interface SQLBook {
  id: number
  title: string
  author: string[]
  file: string
  cover: string
  publisher?: string[]
  language?: string[]
  description?: string
  rights?: string
}
