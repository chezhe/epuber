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
  CircularProgress,
} from '@chakra-ui/react'
import { User } from '@supabase/supabase-js'
import { MoreHorizontal, Search } from 'lucide-react'
import Upload from './Upload'
import Link from 'next/link'
import { useState } from 'react'
import { SQLBook } from '@/types'
import Editor from './Editor'
import useBooks from '@/hooks/useBooks'
import useNav from '@/hooks/useNav'
import BookList from './BookList'

const ChakraMoreHorizontal = chakra(MoreHorizontal)

export default function Shelf({ user }: { user: User | null }) {
  const [managing, setManaging] = useState<SQLBook>()
  const [keyword, setKeyword] = useState('')

  const dark = useDark()
  const books = useBooks()
  const { nav } = useNav()

  const _books = books
    .filter((book) => {
      if (keyword.trim()) {
        return book.title.toLowerCase().includes(keyword.toLowerCase())
      }
      return true
    })
    .filter((book) => {
      if (nav?.category === 'Library') {
        if (nav.active === 'All') {
          return true
        }
        if (nav.active === 'Reading') {
          return book.progress > 0 && book.progress < 100
        }
        if (nav.active === 'Finished') {
          return book.progress === 100
        }
      }
      return true
    })

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
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
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

        <BookList books={_books} />
      </VStack>
    </VStack>
  )
}
