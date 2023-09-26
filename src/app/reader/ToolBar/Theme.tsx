'use client'

import { CaseSensitive } from 'lucide-react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  VStack,
  ModalCloseButton,
  ModalHeader,
} from '@chakra-ui/react'

export default function ThemeBox() {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false })

  return (
    <>
      <CaseSensitive size={24} color="#666" cursor="pointer" onClick={onOpen} />
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          justifyContent="center"
          alignItems="center"
          mt={24}
          borderRadius={2}
          p={8}
        >
          <ModalCloseButton />
          <ModalHeader>Theme</ModalHeader>
          <VStack p={16}></VStack>
        </ModalContent>
      </Modal>
    </>
  )
}
