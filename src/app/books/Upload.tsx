'use client'

import { upload } from '@vercel/blob/client'
import { Plus } from 'lucide-react'
import { parseEpub } from '../reader/epub-parser'
import { Book, SubEvent } from '@/types'
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
  Img,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { User } from '@supabase/supabase-js'
import * as PubSub from 'pubsub-js'

interface TmpBook {
  book: Book
  file: File
}

export default function Upload({ user }: { user: User | null }) {
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

      await Promise.all(
        validBooks.map(async ({ file, book }) => {
          try {
            const cover = book.images.find((i) => i.key.includes('cover'))
            let coverUrl = ''
            if (cover) {
              const coverFile = await fetch(cover.url).then((res) => res.blob())

              const coverBlob = await upload(cover.key, coverFile, {
                access: 'public',
                handleUploadUrl: '/api/upload/cover',
              })
              coverUrl = coverBlob.url
            }
            const bookBlob = await upload(file.name, file, {
              access: 'public',
              handleUploadUrl: '/api/upload/book',
            })
            const fileUrl = bookBlob.url
            await fetch('/api/books/create', {
              method: 'POST',
              body: JSON.stringify({
                title: book.metadata?.title,
                author: book.metadata?.author,
                file: fileUrl,
                cover: coverUrl,
                publisher: book.metadata?.publisher,
                language: book.metadata?.language,
                description: book.metadata?.description,
                rights: book.metadata?.rights,
              }),
            })
          } catch (error) {
            console.log('error', error)
          }
        })
      )

      PubSub.publish(SubEvent.REFRESH_BOOKS)
      onClose()
      setHandling(false)
      setBooks([])
      // inputRef.current?.value = ''
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
      <Plus size={24} color="white" cursor={'pointer'} onClick={onOpen} />
      {isOpen && (
        <Modal
          isOpen
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
              <VStack w="100%" alignItems={'center'} gap={4} mb={4}>
                {books.map((b, idx) => {
                  const cover = b.book.images.find((i) =>
                    i.key.includes('cover')
                  )
                  const title = b.book.metadata?.title
                  const author = b.book.metadata?.author
                  const publisher = b.book.metadata?.publisher
                  return (
                    <VStack key={idx} alignItems={'center'} gap={2}>
                      {cover && (
                        <Img
                          src={cover.url}
                          alt={title}
                          w={32}
                          h={45}
                          objectFit={'cover'}
                        />
                      )}
                      <Text fontWeight={600}>{title}</Text>
                      <Text color="gray.300">{publisher?.join(',')}</Text>
                      <Text color="gray.400">{author?.join(',')}</Text>
                    </VStack>
                  )
                })}
                {handling && (
                  <VStack w="100%" alignItems={'center'} mb={6}>
                    <Text>Processing the book</Text>
                  </VStack>
                )}
              </VStack>

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
      )}
    </>
  )
}
