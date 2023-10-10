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
  Button,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import books from '@/utils/sample.json'
import Link from 'next/link'
import { Search } from 'lucide-react'
import SideBar from './SideBar'
import Login from './Login'

export default function Books() {
  return (
    <HStack h="100vh" gap={0} bg="whiteAlpha.900" alignItems={'flex-start'}>
      <SideBar />
      <VStack
        w="calc(100% - 240px)"
        minH={'100vh'}
        p={8}
        pt={2}
        alignItems={'flex-start'}
      >
        <HStack
          w="100%"
          alignItems={'center'}
          justifyContent={'space-between'}
          p={4}
          px={0}
        >
          <InputGroup>
            <InputLeftElement>
              <Search size={24} color="gray" cursor={'pointer'} />
            </InputLeftElement>
            <Input
              placeholder="Search"
              borderRadius={0}
              outline={'none'}
              borderWidth={0}
              borderBottomWidth={1}
              pl={12}
              w={400}
              color="blackAlpha.800"
              _active={{
                outline: 'none',
                borderWidth: 0,
                borderBottomWidth: 1,
              }}
              _focus={{ outline: 'none', borderWidth: 0, borderBottomWidth: 1 }}
              _focusVisible={{
                outline: 'none',
                borderWidth: 0,
                borderBottomWidth: 1,
              }}
            />
          </InputGroup>
          <Login />
        </HStack>
        <Flex
          w="100%"
          gap={6}
          flexFlow={'row wrap'}
          overflowY={'scroll'}
          alignItems={'flex-start'}
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
                <Text color="blackAlpha.800">{book.title}</Text>
              </VStack>
            </Link>
          ))}
        </Flex>
      </VStack>
    </HStack>
  )
}
