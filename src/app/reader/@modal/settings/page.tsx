'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import Settings from '../../settings/page'

export default function modal() {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const router = useRouter()

  return (
    <Modal
      size="full"
      isOpen={isOpen}
      onClose={() => {
        onClose()
        router.replace('/reader')
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <Settings />
      </ModalContent>
    </Modal>
  )
}
