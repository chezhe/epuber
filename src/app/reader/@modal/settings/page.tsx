'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import Settings from '../../settings/page'

export default function modal() {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const router = useRouter()

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={8}>
        <ModalCloseButton />
        <Settings />
      </ModalContent>
    </Modal>
  )
}
