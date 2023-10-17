import { Box, HStack } from '@chakra-ui/react'
import { Languages, StickyNote, Bot } from 'lucide-react'
import Highlight from './Highlight'
import Tag from './Tag'

export default function Tools() {
  return (
    <HStack
      w="100%"
      position={'absolute'}
      top={'64px'}
      left={0}
      justifyContent={'center'}
    >
      <HStack
        bg="red.500"
        gap={2}
        px={2}
        borderRadius={2}
        right={0}
        color={'white'}
        boxShadow={'lg'}
      >
        <Box _hover={{ bg: 'red.600' }} cursor={'pointer'} p={4}>
          <Languages size={24} cursor={'pointer'} />
        </Box>
        <Highlight />
        <Tag />
        <Box _hover={{ bg: 'red.600' }} cursor={'pointer'} p={4}>
          <StickyNote size={24} cursor={'pointer'} />
        </Box>
        <Box _hover={{ bg: 'red.600' }} cursor={'pointer'} p={4}>
          <Bot size={24} cursor={'pointer'} />
        </Box>
      </HStack>
    </HStack>
  )
}
