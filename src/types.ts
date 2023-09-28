/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Outline {
  title: string
  bold: boolean
  italic: boolean
  /**
   * - The color in RGB format to use for
   * display purposes.
   */
  color: Uint8ClampedArray
  dest: string | Array<any> | null
  url: string | null
  unsafeUrl: string | undefined
  newWindow: boolean | undefined
  count: number | undefined
  items: any[]
}

export interface BookInfo {
  Title: string
  Author: string
}

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
  items?: Chapter[]
}

export interface Book {
  metadata?: Metadata
  chapters: Chapter[]
}
