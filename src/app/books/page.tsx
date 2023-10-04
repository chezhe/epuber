import {
  Flex,
  Heading,
  Img,
  Text,
  VStack,
  Grid,
  GridItem,
  HStack,
} from '@chakra-ui/react'
import books from '@/utils/sample.json'
import Link from 'next/link'
import { Highlighter, Search } from 'lucide-react'

export default function Books() {
  return (
    <VStack h="100vh" gap={0} alignItems={'flex-start'} py={8} px={16}>
      <HStack w="100%" justifyContent={'space-between'}>
        <Heading>Books</Heading>
        <HStack gap={6}>
          <Search size={24} color="#666" cursor="pointer" />
          <Highlighter size={24} color="#666" cursor="pointer" />
        </HStack>
      </HStack>

      <Grid
        mt={8}
        templateColumns={{
          base: `repeat(1, 1fr)`,
          md: `repeat(4, 1fr)`,
        }}
        gap={2}
        width={1000}
        p={0}
      >
        {books.map((book) => (
          <GridItem key={book.title}>
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
          </GridItem>
        ))}
      </Grid>
    </VStack>
  )
}