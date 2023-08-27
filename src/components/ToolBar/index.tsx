'use client'

import { HStack } from '@chakra-ui/react'
import { BookMarked, Bookmark, CaseSensitive, Search } from 'lucide-react'
import Chapters from './Chapters'
import { Outline } from '@/types'

export default function ToolBar({
  outlines,
  title,
}: {
  outlines: Outline[]
  title?: string
}) {
  return (
    <HStack justifyContent="space-between" bg="red.300" w="100%" px={4} py={2}>
      <HStack spacing={4}>
        <Chapters outlines={outlines} title={title} />
        <BookMarked size={24} color="#666" cursor="pointer" />
      </HStack>

      <HStack spacing={4}>
        <CaseSensitive size={24} color="#666" cursor="pointer" />
        <Search size={24} color="#666" cursor="pointer" />
        <Bookmark size={24} color="#666" cursor="pointer" />
      </HStack>
    </HStack>
  )
}
