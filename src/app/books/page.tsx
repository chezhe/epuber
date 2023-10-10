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
import { Plus, Search } from 'lucide-react'
import SideBar from './SideBar'
import Login from './Login'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function Books() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <HStack h="100vh" gap={0} bg="whiteAlpha.900" alignItems={'flex-start'}>
      <SideBar />
      <VStack
        w="calc(100% - 240px)"
        h={'100vh'}
        p={8}
        pt={2}
        alignItems={'flex-start'}
        overflowY={'scroll'}
        bg={'blackAlpha.700'}
        color={'whiteAlpha.900'}
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
              fontSize={20}
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

          {!user ? (
            <Login />
          ) : (
            <HStack>
              <Plus size={24} color="gray" cursor={'pointer'} />
            </HStack>
          )}
        </HStack>
        <Flex w="100%" gap={6} flexFlow={'row wrap'} alignItems={'flex-start'}>
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
    </HStack>
  )
}
