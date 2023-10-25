import { SQLBook } from '@/types'
import {
  Center,
  CircularProgress,
  Flex,
  HStack,
  Icon,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  chakra,
} from '@chakra-ui/react'
import { Edit, Edit2, FolderInput, MoreHorizontal, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Editor from './Editor'
import { useState } from 'react'

const ChakraMoreHorizontal = chakra(MoreHorizontal)

export default function BookList({ books }: { books: SQLBook[] }) {
  const [managing, setManaging] = useState<SQLBook>()
  return (
    <Flex
      w="100%"
      zIndex={10}
      gap={6}
      flexFlow={'row wrap'}
      alignItems={'flex-start'}
    >
      {books.map((book) => {
        return <BookItem key={book.id} book={book} />
      })}
      <Editor book={managing} onClose={() => setManaging(undefined)} />
    </Flex>
  )
}

function BookItem({ book }: { book: SQLBook }) {
  return (
    <Link key={book.id} href={`/reader?book=${book.title}`}>
      <VStack minW={200} cursor={'pointer'} role="group" _groupHover={{}}>
        {book.cover.startsWith('https') ? (
          <Img
            src={book.cover}
            w={200}
            h={280}
            objectFit={'cover'}
            boxShadow="md"
            filter="auto"
            brightness="85%"
            _groupHover={{
              boxShadow: '2xl',
              transform: 'translateY(-5px) scale(1.02)',
              brightness: '100%',
            }}
          />
        ) : (
          <Center
            w={200}
            h={280}
            px={6}
            bg="red.300"
            color="white"
            boxShadow="md"
            filter="auto"
            brightness="90%"
            _groupHover={{
              boxShadow: '2xl',
              transform: 'translateY(-5px) scale(1.02)',
              brightness: '100%',
            }}
          >
            <Text fontSize={24} fontWeight={600} textAlign={'center'}>
              {book.title}
            </Text>
          </Center>
        )}
        <HStack
          w="100%"
          justifyContent={'space-between'}
          onClick={(e) => e.preventDefault()}
        >
          <HStack
            _groupHover={{
              fontWeight: 600,
              transform: 'translateY(-5px)',
            }}
          >
            {book.progress === 0 ? (
              <Text
                bg="red.300"
                fontSize={14}
                px={2}
                borderRadius={2}
                color="whiteAlpha.900"
              >
                NEW
              </Text>
            ) : (
              <HStack>
                <CircularProgress
                  value={book.progress}
                  color="red.400"
                  size="12px"
                  thickness={'12px'}
                  _groupHover={{
                    transform: 'scale(1.6)',
                  }}
                />
                <Text
                  color={'whiteAlpha.800'}
                  _groupHover={{
                    transform: 'scale(1.2)',
                  }}
                >
                  {book.progress}%
                </Text>
              </HStack>
            )}
          </HStack>
          <BookOptions />
        </HStack>
      </VStack>
    </Link>
  )
}

function BookOptions() {
  return (
    <Menu matchWidth>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        border={'none'}
        _hover={{ bg: 'none' }}
        icon={
          <ChakraMoreHorizontal
            size={24}
            color={'whiteAlpha.700'}
            strokeWidth={1}
            _groupHover={{
              strokeWidth: 3,
              color: 'whiteAlpha.900',
            }}
          />
        }
        variant="outline"
      />
      <MenuList minW={32}>
        <MenuItem icon={<Edit strokeWidth={1} size={18} />}>Edit</MenuItem>
        <MenuItem icon={<FolderInput strokeWidth={1} size={18} />}>
          Collect
        </MenuItem>
        <MenuItem icon={<Trash2 strokeWidth={1} size={18} />}>Delete</MenuItem>
      </MenuList>
    </Menu>
  )
}
