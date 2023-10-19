import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  HStack,
  Img,
  VStack,
  Text,
  Button,
  FormControl,
  FormLabel,
  Center,
  Circle,
  Input,
  useToast,
} from '@chakra-ui/react'
import { SQLBook, SubEvent } from '@/types'
import { CheckCircle, PenLine, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import * as PubSub from 'pubsub-js'

export default function Editor({
  book,
  onClose,
}: {
  book?: SQLBook
  onClose: () => void
}) {
  const [ibook, setIBook] = useState<SQLBook | undefined>(book)
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    setIBook(book)
  }, [book])

  const toast = useToast()
  const onDelete = async () => {
    try {
      setDeleting(true)
      if (!ibook) {
        throw new Error('No book selected')
      }

      const res = await fetch(`/api/books/delete`, {
        method: 'POST',
        body: JSON.stringify({ id: ibook.id }),
      })
      console.log('res', res)
      PubSub.publish(SubEvent.REFRESH_BOOKS)
      setDeleting(false)
      onClose()
      toast({
        title: 'Success',
        description: 'Book deleted',
        status: 'success',
      })
    } catch (error) {
      setDeleting(false)
      toast({
        title: 'Error',
        description: (error as Error).message,
        status: 'error',
      })
    }
  }

  const onUpdate = async () => {
    try {
      setEditing(false)
      setUpdating(true)
      if (!ibook) {
        throw new Error('No book selected')
      }
      await fetch(`/api/books/update`, {
        method: 'POST',
        body: JSON.stringify(ibook),
      })
      PubSub.publish(SubEvent.REFRESH_BOOKS)
      setUpdating(false)
      onClose()
      toast({
        title: 'Success',
        description: 'Book updated',
        status: 'success',
      })
    } catch (error) {
      setUpdating(false)
      toast({
        title: 'Error',
        description: (error as Error).message,
        status: 'error',
      })
    }
  }

  return (
    <Modal isOpen={!!book} isCentered size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <HStack gap={8} pt={6} alignItems={'flex-start'}>
            {ibook?.cover?.startsWith('https') ? (
              <Img
                src={ibook?.cover}
                w={300}
                h={420}
                flex={1}
                objectFit={'cover'}
                boxShadow="md"
              />
            ) : (
              <Center
                w={300}
                h={420}
                px={6}
                flex={1}
                bg="red.300"
                color="white"
              >
                <Text fontSize={28} fontWeight={600} textAlign={'center'}>
                  {ibook?.title}
                </Text>
              </Center>
            )}

            <VStack
              alignItems={'flex-start'}
              justifyContent={'space-between'}
              h={400}
              alignSelf={'stretch'}
              w="100%"
              flex={1}
            >
              <VStack w="100%" alignItems={'flex-start'} gap={6}>
                <FormControl lineHeight={1}>
                  <FormLabel fontSize={'xs'} opacity={0.7}>
                    Title
                  </FormLabel>
                  {editing ? (
                    <Input
                      w="100%"
                      value={ibook?.title}
                      onChange={(e) =>
                        setIBook({ ...ibook, title: e.target.value } as SQLBook)
                      }
                    />
                  ) : (
                    <Text fontWeight={600} fontSize={'2xl'}>
                      {ibook?.title}
                    </Text>
                  )}
                </FormControl>
                <FormControl lineHeight={1}>
                  <FormLabel fontSize={'xs'} opacity={0.7}>
                    Author
                  </FormLabel>
                  {editing ? (
                    <Input
                      w="100%"
                      value={ibook?.author?.join('/')}
                      onChange={(e) =>
                        setIBook({
                          ...ibook,
                          author: e.target.value.split('/'),
                        } as SQLBook)
                      }
                    />
                  ) : (
                    <Text>
                      {ibook?.author ? ibook?.author?.join('/') : '-'}
                    </Text>
                  )}
                </FormControl>
                <FormControl lineHeight={1}>
                  <FormLabel fontSize={'xs'} opacity={0.7}>
                    Publisher
                  </FormLabel>
                  {editing ? (
                    <Input
                      w="100%"
                      value={ibook?.publisher?.join('/')}
                      onChange={(e) =>
                        setIBook({
                          ...ibook,
                          publisher: e.target.value.split('/'),
                        } as SQLBook)
                      }
                    />
                  ) : (
                    <Text>
                      {ibook?.publisher ? ibook?.publisher?.join('/') : '-'}
                    </Text>
                  )}
                </FormControl>
              </VStack>

              <HStack gap={4}>
                <Button
                  bg="gray.300"
                  leftIcon={<Trash2 size={20} color="white" />}
                  borderRadius={2}
                  _hover={{ bg: 'gray.500' }}
                  size="sm"
                  onClick={onDelete}
                  color="white"
                  disabled={deleting || updating}
                  isLoading={deleting}
                >
                  Delete
                </Button>
                <Button
                  bg="red.300"
                  leftIcon={
                    editing ? (
                      <CheckCircle size={20} color="white" />
                    ) : (
                      <PenLine size={20} color="white" />
                    )
                  }
                  borderRadius={2}
                  _hover={{ bg: 'red.500' }}
                  size="sm"
                  onClick={() => {
                    if (editing) {
                      onUpdate()
                    } else {
                      setEditing(!editing)
                    }
                  }}
                  color="white"
                  disabled={deleting || updating}
                  isLoading={updating}
                >
                  {editing ? 'Save' : 'Edit'}
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </ModalBody>

        <HStack position={'relative'} justifyContent={'center'} h={8} top={4}>
          <Circle
            bg="red.300"
            p={2}
            cursor={'pointer'}
            opacity={deleting || updating ? 0.8 : 1}
            onClick={() => {
              if (!deleting && !updating) {
                onClose()
              }
            }}
            boxShadow={'lg'}
            _hover={{ bg: 'red.500' }}
          >
            <X size={32} color="white" />
          </Circle>
        </HStack>
      </ModalContent>
    </Modal>
  )
}
