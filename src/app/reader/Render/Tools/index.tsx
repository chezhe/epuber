import { HStack } from '@chakra-ui/react'
import { Highlighter, Languages, Tag, StickyNote, Bot } from 'lucide-react'

export default function Tools() {
  return (
    <HStack
      w="100%"
      position={'absolute'}
      top={'70px'}
      left={0}
      justifyContent={'center'}
    >
      <HStack
        bg="blue.300"
        py={4}
        px={6}
        gap={8}
        borderRadius={2}
        right={0}
        color={'white'}
      >
        <Languages size={24} cursor={'pointer'} />
        <Highlighter size={24} cursor={'pointer'} />
        <Tag size={24} cursor={'pointer'} />
        <StickyNote size={24} cursor={'pointer'} />
        <Bot size={24} cursor={'pointer'} />
      </HStack>
    </HStack>
  )
}
