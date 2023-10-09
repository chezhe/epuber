'use client'

import { HStack, Img, Input, VStack, Text } from '@chakra-ui/react'
import { BookOpen, CheckCircle, Library, Plus } from 'lucide-react'
import { useState } from 'react'

const library = [
  {
    icon: <Library size={18} />,
    title: 'All',
  },
  {
    icon: <BookOpen size={18} />,
    title: 'Reading',
  },
  {
    icon: <CheckCircle size={18} />,
    title: 'Finished',
  },
]

export default function SideBar() {
  const [active, setActive] = useState(library[0])
  return (
    <VStack w={240} bg="gray.200" h="100%" py={2} gap={6}>
      <HStack w="100%" justifyContent={'center'} px={2}>
        <Img src="/logo.png" w={40} />
      </HStack>
      <HStack w="100%" px={2}>
        <Input placeholder="Search" borderColor={'gray.400'} />
      </HStack>

      <VStack w="100%" px={2} alignItems={'flex-start'} gap={0}>
        <Text fontWeight={700} fontSize={14}>
          Library
        </Text>
        {library.map((item) => (
          <HStack
            key={item.title}
            w="100%"
            pl={2}
            py={2}
            cursor={'pointer'}
            bg={active.title === item.title ? 'gray.300' : 'transparent'}
            _hover={{
              bg: 'gray.300',
            }}
            onClick={() => setActive(item)}
          >
            {item.icon}
            <Text>{item.title}</Text>
          </HStack>
        ))}
      </VStack>

      <VStack w="100%" px={2} alignItems={'flex-start'}>
        <HStack w="100%" justifyContent={'space-between'}>
          <Text fontWeight={700} fontSize={14}>
            Collections
          </Text>
          <Plus size={18} cursor={'pointer'} />
        </HStack>
      </VStack>
    </VStack>
  )
}
