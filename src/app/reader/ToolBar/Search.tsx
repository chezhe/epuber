'use client'

import { Search } from 'lucide-react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export default function SearchBox() {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false })
  return (
    <>
      <Search size={24} color="#666" cursor="pointer" onClick={onOpen} />
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          justifyContent="center"
          alignItems="center"
          mt={24}
          borderRadius={2}
        >
          <HStack
            alignItems="center"
            justifyContent="center"
            p={2}
            px={4}
            w="100%"
          >
            <SearchIcon boxSize={6} color="gray.300" />

            <Input
              placeholder="Search"
              size="lg"
              outline="none"
              focusBorderColor="transparent"
              borderColor="transparent"
              width="100%"
              _focus={{ border: '0px' }}
            />
          </HStack>
        </ModalContent>
      </Modal>
    </>
  )
}
