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
  Center,
  chakra,
} from '@chakra-ui/react'
import { User } from '@supabase/supabase-js'
import { MoreHorizontal, Search } from 'lucide-react'
import Upload from './Upload'
import Link from 'next/link'
import { useState } from 'react'
import { SQLBook } from '@/types'
import Editor from './Editor'
import useBooks from '@/hooks/useBooks'

const ChakraMoreHorizontal = chakra(MoreHorizontal)

export default function Shelf({ user }: { user: User | null }) {
  const [managing, setManaging] = useState<SQLBook>()

  const dark = useDark()
  const books = useBooks()

  return (
    <VStack
      w="calc(100% - 240px)"
      h={'100vh'}
      alignItems={'flex-start'}
      overflowY={'scroll'}
      // bg={!dark ? 'whiteAlpha.700' : 'blackAlpha.700'}
      color={!dark ? 'blackAlpha.800' : 'whiteAlpha.800'}
      bgImage={`url(https://ke32uptj4ahgsaub.public.blob.vercel-storage.com/cover-7AVETtKBeZgFiTnolohmqRBIcXHiNL.jpeg)`}
      bgSize={'cover'}
      bgPos={'center'}
      pos={'relative'}
    >
      <VStack
        backdropFilter={'blur(80px) brightness(0.5)'}
        pos={'absolute'}
        left={0}
        top={0}
        p={8}
        pt={2}
        w="100%"
        minH="100vh"
      >
        <HStack
          w="100%"
          alignItems={'center'}
          justifyContent={'space-between'}
          p={4}
          px={0}
          zIndex={10}
        >
          <InputGroup>
            <InputLeftElement>
              <Search size={24} color={'#aaa'} cursor={'pointer'} />
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
              color={'whiteAlpha.700'}
              _placeholder={{ color: 'whiteAlpha.700' }}
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
              <Upload user={user} />
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
        <Flex
          w="100%"
          zIndex={10}
          gap={6}
          flexFlow={'row wrap'}
          alignItems={'flex-start'}
        >
          {books.map((book) => (
            <Link key={book.title} href={`/reader?book=${book.title}`}>
              <VStack
                minW={200}
                cursor={'pointer'}
                role="group"
                _groupHover={{}}
              >
                {book.cover.startsWith('https') ? (
                  <Img
                    src={book.cover}
                    w={200}
                    h={260}
                    objectFit={'cover'}
                    boxShadow="md"
                    _groupHover={{
                      boxShadow: 'outline',
                      transform: 'translateY(-5px)',
                    }}
                  />
                ) : (
                  <Center
                    w={200}
                    h={260}
                    bg="red.300"
                    color="white"
                    _groupHover={{
                      boxShadow: 'outline',
                      transform: 'translateY(-5px)',
                    }}
                  >
                    <Text fontSize={32} fontWeight={600}>
                      {book.title}
                    </Text>
                  </Center>
                )}
                <HStack
                  w="100%"
                  justifyContent={'space-between'}
                  onClick={(e) => e.preventDefault()}
                >
                  <Text
                    isTruncated
                    maxW={140}
                    color={'whiteAlpha.800'}
                    _groupHover={{
                      fontWeight: 600,
                      transform: 'translateY(-5px)',
                    }}
                  >
                    {book.title}
                  </Text>
                  <ChakraMoreHorizontal
                    size={24}
                    color={'whiteAlpha.700'}
                    onClick={() => setManaging(book)}
                    strokeWidth={1}
                    _groupHover={{
                      transform: 'translateY(-5px)',
                      strokeWidth: 3,
                      color: 'whiteAlpha.900',
                    }}
                  />
                </HStack>
              </VStack>
            </Link>
          ))}
          <Editor book={managing} onClose={() => setManaging(undefined)} />
        </Flex>
      </VStack>
    </VStack>
  )
}
