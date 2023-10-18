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
} from '@chakra-ui/react'
import { SQLBook } from '@/types'
import { CheckCircle, PenLine, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Editor({
  book,
  onClose,
}: {
  book?: SQLBook
  onClose: () => void
}) {
  const [ibook, setIBook] = useState<SQLBook | undefined>(book)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setIBook(book)
  }, [book])

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
                h={400}
                flex={1}
                objectFit={'cover'}
                boxShadow="md"
                _groupHover={{
                  boxShadow: 'outline',
                }}
              />
            ) : (
              <Center
                w={300}
                h={400}
                flex={1}
                bg="red.300"
                color="white"
                _groupHover={{
                  boxShadow: 'outline',
                  transform: 'translateY(-5px)',
                }}
              >
                <Text fontSize={32} fontWeight={600}>
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
                  onClick={() => {}}
                  color="white"
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
                  onClick={() => setEditing(!editing)}
                  color="white"
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
            onClick={onClose}
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
