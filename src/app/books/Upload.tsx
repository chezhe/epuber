'use client'

import { type PutBlobResult } from '@vercel/blob'
import { upload } from '@vercel/blob/client'
import { Plus } from 'lucide-react'
import { parseEpub } from '../reader/epub-parser'
import { Book } from '@/types'
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  VStack,
  Button,
  Input,
  HStack,
  Img,
  Text,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'

interface TmpBook {
  book: Book
  file: File
}

export default function Upload() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const inputRef = useRef(null)
  const [books, setBooks] = useState<TmpBook[]>([])
  const [handling, setHandling] = useState(false)

  const toast = useToast()
  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setHandling(true)
    try {
      if (!e.target?.files) {
        throw new Error('No file selected')
      }

      const files = e.target.files

      const books = await Promise.all(
        Array.from(files).map(async (file) => {
          try {
            const book = await parseEpub(file)
            return {
              book,
              file,
            }
          } catch (error) {
            return null
          }
        })
      )
      const validBooks = books.filter(Boolean) as TmpBook[]
      setBooks(validBooks)

      const blobs = await Promise.all(
        validBooks.map(async ({ file }) => {
          const newBlob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/api/upload/book',
          })
          return newBlob
        })
      )
      console.log('blobs', blobs)
      onClose()
      setHandling(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        status: 'error',
      })
    }
  }
  return (
    <>
      <Plus size={24} color="gray" cursor={'pointer'} onClick={onOpen} />
      <Modal
        isOpen={isOpen}
        isCentered
        onClose={() => {
          setBooks([])
          onClose()
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader fontSize={28} textAlign={'center'}>
            Upload Books
          </ModalHeader>
          <VStack p={4} px={8}>
            {handling ? (
              <VStack w="100%" alignItems={'center'} mb={6}>
                <Text>Processing the book</Text>
              </VStack>
            ) : (
              <VStack w="100%" alignItems={'flex-start'} gap={4} mb={4}>
                {books.map((b, idx) => {
                  const cover = b.book.images.find((i) =>
                    i.key.includes('cover')
                  )
                  const title = b.book.metadata?.title
                  const author = b.book.metadata?.author
                  const publisher = b.book.metadata?.publisher
                  return (
                    <HStack key={idx} alignItems={'flex-start'} gap={4}>
                      {cover && (
                        <Img
                          src={cover.url}
                          alt={title}
                          w={20}
                          h={24}
                          objectFit={'cover'}
                        />
                      )}
                      <VStack alignItems={'flex-start'} gap={0}>
                        <Text fontWeight={600}>{title}</Text>
                        <Text color="gray.300">{publisher?.join(',')}</Text>
                        <Text color="gray.400">{author?.join(',')}</Text>
                      </VStack>
                    </HStack>
                  )
                })}
              </VStack>
            )}

            <Button
              w="100%"
              bg="red.300"
              onClick={() => {
                ;(inputRef.current as any)?.click()
              }}
              isLoading={handling}
            >
              {books.length > 0 ? 'Confirm' : 'Add Books'}
            </Button>
            <Input
              ref={inputRef}
              type="file"
              onChange={uploadFile}
              multiple={false}
              borderRadius={2}
              accept=".epub"
              display={'inline'}
              visibility={'hidden'}
              h={0}
            />
          </VStack>
        </ModalContent>
      </Modal>
    </>
  )
}
