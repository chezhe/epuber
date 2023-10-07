import {
  Heading,
  Img,
  Text,
  VStack,
  Grid,
  GridItem,
  HStack,
  Flex,
} from '@chakra-ui/react'
import books from '@/utils/sample.json'
import Link from 'next/link'
import { Highlighter, Search } from 'lucide-react'

export default function Books() {
  return (
    <VStack
      minH="100vh"
      gap={0}
      bg="whiteAlpha.200"
      alignItems={'flex-start'}
      py={8}
      px={16}
    >
      <HStack w="100%" justifyContent={'space-between'}>
        <Img src="/logo.png" w={40} />
        <HStack gap={6}>
          <Search size={24} color="#666" cursor="pointer" />
          <Highlighter size={24} color="#666" cursor="pointer" />
        </HStack>
      </HStack>

      <Flex mt={8} gap={8} width={1000} p={0} flexFlow={'row wrap'}>
        {books.map((book) => (
          <Link href={`/reader?book=${book.title}`}>
            <VStack minW={200} cursor={'pointer'}>
              <Img
                src={book.cover}
                w={200}
                h={260}
                objectFit={'cover'}
                boxShadow="md"
              />
              <Text>{book.title}</Text>
            </VStack>
          </Link>
        ))}
      </Flex>
    </VStack>
  )
}
