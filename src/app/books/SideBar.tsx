'use client'

import useDark from '@/hooks/useDark'
import { HStack, Img, VStack, Text, useColorMode } from '@chakra-ui/react'
import {
  BookOpen,
  CheckCircle,
  Highlighter,
  Library,
  Plus,
  Settings,
  StickyNote,
  Tags,
} from 'lucide-react'
import React, { useState } from 'react'

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

const inspiration = [
  {
    icon: <Highlighter size={18} />,
    title: 'Highlights',
  },
  {
    icon: <StickyNote size={18} />,
    title: 'Notes',
  },
  {
    icon: <Tags size={18} />,
    title: 'Tags',
  },
]

export default function SideBar() {
  const [active, setActive] = useState(library[0])
  const dark = useDark()

  return (
    <VStack
      w={240}
      bg={dark ? 'blackAlpha.800' : 'blackAlpha.300'}
      justifyContent={'space-between'}
      h="100%"
      py={4}
    >
      <VStack w="100%" gap={6}>
        <HStack w="100%" justifyContent={'center'} px={2}>
          <Img src="/logo.png" w={40} />
        </HStack>

        <VStack w="100%" px={2} alignItems={'flex-start'} gap={0}>
          <Text fontWeight={700} fontSize={14} mb={2}>
            Library
          </Text>
          {library.map((item) => (
            <NavItem
              key={item.title}
              {...item}
              isActive={item.title === active.title}
              onClick={setActive}
            />
          ))}
        </VStack>

        <VStack w="100%" px={2} alignItems={'flex-start'} gap={0}>
          <Text fontWeight={700} fontSize={14} mb={2}>
            Inspiration
          </Text>
          {inspiration.map((item) => (
            <NavItem
              key={item.title}
              {...item}
              isActive={item.title === active.title}
              onClick={setActive}
            />
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
      <VStack w="100%">
        <NavItem
          title="Settings"
          icon={<Settings />}
          isActive={'Settings' === active.title}
          onClick={setActive}
        />
      </VStack>
    </VStack>
  )
}

function NavItem({
  icon,
  title,
  isActive,
  onClick,
}: {
  icon: React.ReactElement
  title: string
  isActive: boolean
  onClick: (param: { title: string; icon: React.ReactElement }) => void
}) {
  const dark = useDark()
  const bg = dark ? 'blackAlpha.400' : 'blackAlpha.100'
  return (
    <HStack
      key={title}
      w="100%"
      pl={2}
      py={2}
      cursor={'pointer'}
      bg={isActive ? bg : 'transparent'}
      _hover={{
        bg,
      }}
      onClick={() => onClick({ title, icon })}
    >
      {icon}
      <Text>{title}</Text>
    </HStack>
  )
}
