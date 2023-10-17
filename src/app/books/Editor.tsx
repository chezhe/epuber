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
} from '@chakra-ui/react'
import { SQLBook } from '@/types'
import { PenLine, PenSquare, Trash2 } from 'lucide-react'

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
          <HStack w="100%" justifyContent={'flex-end'} gap={4} mt={2}>
            <Trash2 size={20} color="#008cd5" cursor={'pointer'} />
            <PenLine size={20} color="#008cd5" cursor={'pointer'} />
          </HStack>
          <HStack gap={8} pb={4} alignItems={'flex-start'}>
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
            <VStack
              alignItems={'flex-start'}
              justifyContent={'space-between'}
              flex={1}
              alignSelf={'stretch'}
              h="100%"
            >
              <Text fontWeight={600} fontSize={'2xl'}>
                {book?.title}
              </Text>
              <Text>{book?.author?.join('/')}</Text>
              <Text>{book?.publisher?.join('/')}</Text>

              <HStack></HStack>
            </VStack>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
