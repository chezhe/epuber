'use client'

import { HStack } from '@chakra-ui/react'
import { Bookmark, CaseSensitive, List, Search } from 'lucide-react'

export default function ToolBar() {
  return (
    <HStack justifyContent="space-between" bg="red.300" w="100%" px={4} py={2}>
      <HStack spacing={4}>
        <List size={24} color="#666" />
        <Bookmark size={24} color="#666" />
      </HStack>

      <HStack spacing={4}>
        <Search size={24} color="#666" />
        <CaseSensitive size={24} color="#666" />
      </HStack>
    </HStack>
  )
}
