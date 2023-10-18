import {
  Box,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { Tag as TagIcon } from 'lucide-react'

const tags = [
  {
    id: 1,
    value: 'Crypto',
  },
  {
    id: 2,
    value: 'Rick and Morty',
  },
  {
    id: 3,
    value: '隐喻',
  },
  {
    id: 4,
    value: '古希腊',
  },
]

export default function Tag() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Popover trigger="hover" onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box bg={isOpen ? 'red.600' : ''} p={4}>
          <TagIcon size={24} cursor={'pointer'} />
        </Box>
      </PopoverTrigger>
      <PopoverContent w={'auto'} borderRadius={2} bg="gray.600">
        <PopoverBody p={0}>
          <VStack gap={0} alignItems={'flex-start'}>
            {tags.map((t, idx) => {
              return (
                <Box
                  key={t.id}
                  px={2}
                  w="100%"
                  cursor={'pointer'}
                  onClick={() => {}}
                  _hover={{ bg: 'whiteAlpha.300' }}
                >
                  <Text isTruncated maxW={160}>
                    {t.value}
                  </Text>
                </Box>
              )
            })}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
