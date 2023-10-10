'use client'

import { Text, HStack } from '@chakra-ui/react'
import { BookMarked, Bookmark, Home, Library, Settings } from 'lucide-react'
import Link from 'next/link'
import SearchBox from './Search'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ThemeBox from './Theme'
import { Book, Chapter } from '@/types'
import Toc from './Toc'

export default function ToolBar({
  book,
  activeChapter,
  setActiveChapter,
}: {
  book?: Book
  activeChapter?: Chapter
  setActiveChapter: (chapter: Chapter | undefined) => void
}) {
  const title = book?.metadata?.title || ''
  const router = useRouter()
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === ',') {
        router.push('/reader/settings')
        event.preventDefault()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
  return (
    <HStack justifyContent="space-between" bg="red.300" w="100%" px={6} py={4}>
      <HStack spacing={6}>
        <Link href="/books">
          <Home size={24} color="#666" cursor="pointer" />
        </Link>
        <Link href="/reader/settings">
          <Settings size={24} color="#666" cursor="pointer" />
        </Link>
        <Toc
          chapters={book?.chapters}
          activeChapter={activeChapter}
          setActiveChapter={setActiveChapter}
        />
        {/* <BookMarked size={24} color="#666" cursor="pointer" /> */}
      </HStack>

      <Text color="blackAlpha.700" fontWeight="bold">
        {title} / {activeChapter?.title}
      </Text>

      <HStack spacing={6}>
        <ThemeBox />
        <SearchBox book={book} setActiveChapter={setActiveChapter} />
        <Bookmark size={24} color="#666" cursor="pointer" />
      </HStack>
    </HStack>
  )
}
