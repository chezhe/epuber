'use client'

import useDark from '@/hooks/useDark'
import {
  Img,
  Text,
  VStack,
  HStack,
  Flex,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { User } from '@supabase/supabase-js'
import { Search } from 'lucide-react'
import Upload from './Upload'
import Link from 'next/link'
import books from '@/utils/sample.json'

export default function Shelf({ user }: { user: User | null }) {
  const dark = useDark()
  return (
    <VStack
      w="calc(100% - 240px)"
      h={'100vh'}
      p={8}
      pt={2}
      alignItems={'flex-start'}
      overflowY={'scroll'}
      bg={!dark ? 'whiteAlpha.700' : 'blackAlpha.700'}
      color={!dark ? 'blackAlpha.800' : 'whiteAlpha.800'}
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

        {user !== null ? (
          <HStack>
            <Upload />
          </HStack>
        ) : (
          <HStack>
            <Link href="/login">
              <Button
                variant={'outline'}
                bg="red.300"
                _hover={{ bg: 'red.400' }}
                color="whiteAlpha.900"
                borderRadius={2}
                px={6}
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                variant={'outline'}
                _hover={{ bg: 'whiteAlpha.400' }}
                borderRadius={2}
                px={6}
              >
                Sign Up
              </Button>
            </Link>
          </HStack>
        )}
      </HStack>
      <Flex w="100%" gap={6} flexFlow={'row wrap'} alignItems={'flex-start'}>
        {books.map((book) => (
          <Link href={`/reader?book=${book.title}`}>
            <VStack minW={200} cursor={'pointer'} role="group" _groupHover={{}}>
              <Img
                src={book.cover}
                w={200}
                h={260}
                objectFit={'cover'}
                boxShadow="md"
                _groupHover={{
                  boxShadow: 'outline',
                }}
              />
              <Text _groupHover={{ fontWeight: 600 }}>{book.title}</Text>
            </VStack>
          </Link>
        ))}
      </Flex>
    </VStack>
  )
}
