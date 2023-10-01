export interface Metadata {
  title: string
  author: string
  publisher?: string
  language?: string
  description?: string
  rights?: string
}

export interface Chapter {
  title: string
  src: string
  playOrder: number
  content: string
  items?: Chapter[]
}

export interface Book {
  metadata?: Metadata
  chapters: Chapter[]
}
