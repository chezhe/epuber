'use client'

import { Text, HStack } from '@chakra-ui/react'
import {
  BookMarked,
  Bookmark,
  CaseSensitive,
  List,
  Search,
  Settings,
} from 'lucide-react'
import Link from 'next/link'
import SearchBox from './Search'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ThemeBox from './Theme'

export default function ToolBar({ title }: { title?: string }) {
  const router = useRouter()
  useEffect(() => {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === ',') {
        router.push('/reader/settings')
        event.preventDefault()
      }
    })
    return () => window.removeEventListener('keydown', () => {})
  }, [])
  return (
    <HStack justifyContent="space-between" bg="red.300" w="100%" px={6} py={3}>
      <HStack spacing={6}>
        <Link href="/reader/settings">
          <Settings size={24} color="#666" cursor="pointer" />
        </Link>
        <List size={24} color="#666" cursor="pointer" />
        <BookMarked size={24} color="#666" cursor="pointer" />
      </HStack>

      <Text color="blackAlpha.700" fontWeight="bold">
        {title}
      </Text>

      <HStack spacing={6}>
        <ThemeBox />
        <SearchBox />
        <Bookmark size={24} color="#666" cursor="pointer" />
      </HStack>
    </HStack>
  )
}
