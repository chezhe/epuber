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
} from '@chakra-ui/react'

export default function Upload() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

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
    const validBooks = books.filter(Boolean) as { book: Book; file: File }[]

    console.log('validBooks', validBooks)

    // const blobs = await Promise.all(
    //   validBooks.map(async ({ file }) => {
    //     const newBlob = await upload(file.name, file, {
    //       access: 'public',
    //       handleUploadUrl: '/api/book/upload',
    //     })
    //     return newBlob
    //   })
    // )
  }
  return (
    <>
      <Plus size={24} color="gray" cursor={'pointer'} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader fontSize={32} textAlign={'center'}>
            Upload Books
          </ModalHeader>
          <VStack p={4} px={8}>
            <Input type="file" onChange={uploadFile} borderRadius={2} />
          </VStack>
        </ModalContent>
      </Modal>
    </>
  )
}
