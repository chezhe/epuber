import {
  Box,
  Circle,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { Highlighter, Underline } from 'lucide-react'

const styles = [
  {
    value: 'red.400',
    type: 'color',
  },
  {
    value: 'yellow.400',
    type: 'color',
  },
  {
    value: 'green.400',
    type: 'color',
  },
  {
    value: 'blue.400',
    type: 'color',
  },
  {
    type: 'decoration',
    value: <Underline size={24} cursor={'pointer'} />,
  },
]

export default function Highlight() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Popover trigger="hover" onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box bg={isOpen ? 'red.600' : ''} p={4}>
          <Highlighter size={24} cursor={'pointer'} />
        </Box>
      </PopoverTrigger>
      <PopoverContent w={'auto'} borderRadius={2} bg="gray.600">
        <PopoverBody p={0}>
          <VStack gap={2} py={2} w={12} alignItems={'center'}>
            {styles.map((s, idx) => {
              if (s.type === 'color') {
                return (
                  <Box key={idx}>
                    <Circle
                      size={6}
                      bg={s.value as string}
                      cursor={'pointer'}
                    />
                  </Box>
                )
              }
              if (s.type === 'decoration') {
                return (
                  <Box key={idx} cursor={'pointer'}>
                    {s.value}
                  </Box>
                )
              }
            })}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
