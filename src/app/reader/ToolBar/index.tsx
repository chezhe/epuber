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

export default function ToolBar({ title }: { title?: string }) {
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
        <CaseSensitive size={24} color="#666" cursor="pointer" />
        <SearchBox />
        <Bookmark size={24} color="#666" cursor="pointer" />
      </HStack>
    </HStack>
  )
}
