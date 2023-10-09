import {
  Heading,
  Img,
  Text,
  VStack,
  Grid,
  GridItem,
  HStack,
  Flex,
  Input,
} from '@chakra-ui/react'
import books from '@/utils/sample.json'
import Link from 'next/link'
import { Highlighter, Search } from 'lucide-react'
import SideBar from './SideBar'

export default function Books() {
  return (
    <HStack h="100vh" gap={0} bg="whiteAlpha.900" alignItems={'flex-start'}>
      <SideBar />
      <Flex
        p={8}
        gap={8}
        width={1000}
        flexFlow={'row wrap'}
        overflowY={'scroll'}
      >
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
    </HStack>
  )
}
