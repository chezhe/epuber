import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Img,
  VStack,
  Text,
  Button,
  FormControl,
  FormLabel,
  Center,
} from '@chakra-ui/react'
import { SQLBook } from '@/types'
import { CheckCircle, PenLine, PenSquare, Trash2 } from 'lucide-react'

export default function Editor({
  book,
  onClose,
}: {
  book?: SQLBook
  onClose: () => void
}) {
  console.log('book', book)

  return (
    <Modal isOpen={!!book} isCentered size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack gap={8} pb={6} alignItems={'flex-start'}>
            {book?.cover.startsWith('https') ? (
              <Img
                src={book?.cover}
                w={300}
                h={400}
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
                bg="red.300"
                color="white"
                _groupHover={{
                  boxShadow: 'outline',
                  transform: 'translateY(-5px)',
                }}
              >
                <Text fontSize={32} fontWeight={600}>
                  {book?.title}
                </Text>
              </Center>
            )}

            <VStack
              alignItems={'flex-start'}
              justifyContent={'space-between'}
              h={400}
              alignSelf={'stretch'}
            >
              <VStack alignItems={'flex-start'} gap={6}>
                <FormControl lineHeight={1}>
                  <FormLabel fontSize={'xs'} opacity={0.7}>
                    Title
                  </FormLabel>
                  <Text fontWeight={600} fontSize={'2xl'}>
                    {book?.title}
                  </Text>
                </FormControl>
                <FormControl lineHeight={1}>
                  <FormLabel fontSize={'xs'} opacity={0.7}>
                    Author
                  </FormLabel>
                  <Text>{book?.author ? book?.author?.join('/') : '-'}</Text>
                </FormControl>
                <FormControl lineHeight={1}>
                  <FormLabel fontSize={'xs'} opacity={0.7}>
                    Publisher
                  </FormLabel>
                  <Text>
                    {book?.publisher ? book?.publisher?.join('/') : '-'}
                  </Text>
                </FormControl>
              </VStack>

              <HStack gap={4}>
                <Button
                  bg="red.300"
                  leftIcon={<PenLine size={20} color="white" />}
                  borderRadius={2}
                  _hover={{ bg: 'red.500' }}
                  size="sm"
                >
                  <Text color="white">Edit</Text>
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
