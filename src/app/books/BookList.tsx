import { SQLBook } from '@/types'
import {
  Button,
  Center,
  Checkbox,
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  chakra,
} from '@chakra-ui/react'
import { Edit, Edit2, FolderInput, MoreHorizontal, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Editor from './Editor'
import { useState } from 'react'
import useCollections from '@/hooks/useCollections'

const ChakraMoreHorizontal = chakra(MoreHorizontal)

export default function BookList({ books }: { books: SQLBook[] }) {
  const [managing, setManaging] = useState<SQLBook>()
  const [collecting, setCollecting] = useState<SQLBook>()

  return (
    <Flex
      w="100%"
      zIndex={10}
      gap={6}
      flexFlow={'row wrap'}
      alignItems={'flex-start'}
    >
      {books.map((book) => {
        return (
          <BookItem
            key={book.id}
            book={book}
            onCollect={() => setCollecting(book)}
          />
        )
      })}
      <Editor book={managing} onClose={() => setManaging(undefined)} />
      <Collector book={collecting} onClose={() => setCollecting(undefined)} />
    </Flex>
  )
}

function Collector({ book, onClose }: { book?: SQLBook; onClose: () => void }) {
  const collections = useCollections()
  const [collectIds, setCollectIds] = useState<number[]>([])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCollectIds([...collectIds, Number(e.target.value)])
    } else {
      setCollectIds(collectIds.filter((id) => id !== Number(e.target.value)))
    }
  }
  return (
    <Modal isOpen={!!book} isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton onClick={onClose} />
        <ModalHeader>Collect to</ModalHeader>
        <ModalBody>
          <VStack alignItems={'flex-start'} w="100%">
            {collections.map((collection, idx) => (
              <HStack
                key={idx}
                w="100%"
                p={2}
                _hover={{
                  bg: 'gray.100',
                }}
              >
                <Checkbox
                  w="100%"
                  size="lg"
                  colorScheme="red"
                  checked={collectIds.includes(collection.id)}
                  onChange={onChange}
                >
                  <Text fontSize={18}>{collection.title}</Text>
                </Checkbox>
              </HStack>
            ))}
          </VStack>
          <Button
            w="100%"
            mt={4}
            colorScheme="red"
            bg="red.300"
            borderRadius={2}
            disabled={collectIds.length === 0}
          >
            Confirm
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

function BookItem({
  book,
  onCollect,
}: {
  book: SQLBook
  onCollect: () => void
}) {
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
              transform: 'translateY(-5px) scale(1.01)',
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
              transform: 'translateY(-5px) scale(1.01)',
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
          <BookOptions onCollect={onCollect} />
        </HStack>
      </VStack>
    </Link>
  )
}

function BookOptions({ onCollect }: { onCollect: () => void }) {
  return (
    <Menu matchWidth>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        border={'none'}
        _hover={{ bg: 'none' }}
        _active={{ bg: 'none' }}
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
        <MenuItem
          icon={<FolderInput strokeWidth={1} size={18} />}
          onClick={onCollect}
        >
          Collect
        </MenuItem>
        <MenuItem icon={<Trash2 strokeWidth={1} size={18} />}>Delete</MenuItem>
      </MenuList>
    </Menu>
  )
}
