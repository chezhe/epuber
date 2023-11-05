'use client'

import useDark from '@/hooks/useDark'
import useNav from '@/hooks/useNav'
import { SubEvent } from '@/types'
import {
  HStack,
  Img,
  VStack,
  Text,
  useColorMode,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import {
  BookOpen,
  CheckCircle,
  Folder,
  FolderOpen,
  Highlighter,
  Library,
  Plus,
  PlusCircle,
  Settings,
  StickyNote,
  Tags,
} from 'lucide-react'
import React, { useState } from 'react'
import * as PubSub from 'pubsub-js'
import useCollections from '@/hooks/useCollections'

const library = [
  {
    icon: <Library size={18} />,
    title: 'All',
  },
  {
    icon: <BookOpen size={18} />,
    title: 'Reading',
  },
  {
    icon: <CheckCircle size={18} />,
    title: 'Finished',
  },
]

const inspiration = [
  {
    icon: <Highlighter size={18} />,
    title: 'Highlights',
  },
  {
    icon: <StickyNote size={18} />,
    title: 'Notes',
  },
  {
    icon: <Tags size={18} />,
    title: 'Tags',
  },
]

export default function SideBar() {
  const dark = useDark()
  const { nav, setNav } = useNav()
  const { collections } = useCollections()
  const bg = dark ? 'blackAlpha.400' : 'blackAlpha.100'

  return (
    <VStack
      w={240}
      bg={dark ? 'blackAlpha.800' : 'blackAlpha.300'}
      justifyContent={'space-between'}
      h="100%"
      py={4}
      overflowY={'scroll'}
    >
      <VStack w="100%" gap={6}>
        <HStack w="100%" justifyContent={'center'} px={2}>
          <Img src="/logo.png" w={40} />
        </HStack>

        <VStack w="100%" px={2} alignItems={'flex-start'} gap={0}>
          <Text fontWeight={700} fontSize={14} mb={2}>
            Library
          </Text>
          {library.map((item) => (
            <NavItem
              key={item.title}
              {...item}
              isActive={item.title === nav?.active}
              onClick={(param) =>
                setNav({ category: 'Library', active: param.title })
              }
            />
          ))}
        </VStack>

        <VStack w="100%" px={2} alignItems={'flex-start'} gap={0}>
          <Text fontWeight={700} fontSize={14} mb={2}>
            Inspiration
          </Text>
          {inspiration.map((item) => (
            <NavItem
              key={item.title}
              {...item}
              isActive={item.title === nav?.active}
              onClick={(param) =>
                setNav({ category: 'Inspiration', active: param.title })
              }
            />
          ))}
        </VStack>

        <VStack w="100%" px={2} alignItems={'flex-start'}>
          <HStack w="100%" justifyContent={'space-between'}>
            <Text fontWeight={700} fontSize={14}>
              Collections
            </Text>
            <AddCollection />
          </HStack>
          {collections.map((c, idx) => {
            const isActive =
              c.title === nav?.active && nav?.category === 'Collections'
            return (
              <NavItem
                key={idx}
                title={c.title}
                icon={
                  isActive ? <FolderOpen size={18} /> : <Folder size={18} />
                }
                isActive={isActive}
                onClick={(param) =>
                  setNav({ category: 'Collections', active: param.title })
                }
                rightElement={<Text>{c.book_ids.length}</Text>}
              />
            )
          })}
        </VStack>
      </VStack>
      <VStack w="100%">
        <NavItem
          title="Settings"
          icon={<Settings />}
          isActive={'Settings' === nav?.active}
          onClick={(param) =>
            setNav({ category: 'Settings', active: param.title })
          }
        />
      </VStack>
    </VStack>
  )
}

function NavItem({
  icon,
  title,
  isActive,
  onClick,
  rightElement,
}: {
  icon: React.ReactElement
  title: string
  isActive: boolean
  onClick: (param: { title: string; icon: React.ReactElement }) => void
  rightElement?: React.ReactElement
}) {
  const dark = useDark()
  const bg = dark ? 'blackAlpha.400' : 'blackAlpha.100'
  return (
    <HStack
      key={title}
      w="100%"
      px={2}
      py={2}
      cursor={'pointer'}
      bg={isActive ? bg : 'transparent'}
      justifyContent={'space-between'}
      _hover={{
        bg,
      }}
      onClick={() => onClick({ title, icon })}
    >
      <HStack>
        {icon}
        <Text>{title}</Text>
      </HStack>
      {rightElement}
    </HStack>
  )
}

function AddCollection() {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [handling, setHandling] = useState(false)
  const toast = useToast()

  const _onClose = () => {
    if (!handling) {
      onClose()
    }
  }
  const onSubmit = async () => {
    try {
      setHandling(true)
      if (!title.trim()) {
        throw new Error('Title is required')
      }
      await fetch('/api/collections/create', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
      })
      PubSub.publish(SubEvent.REFRESH_COLLECTIONS)
      setHandling(false)
      setTitle('')
      setDescription('')
      onClose()
    } catch (error) {
      setHandling(false)
      toast({
        title: 'Error',
        description: (error as Error).message,
        status: 'error',
      })
    }
  }
  return (
    <>
      <PlusCircle size={18} cursor={'pointer'} onClick={onOpen} />
      <Modal isCentered isOpen={isOpen} onClose={_onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Collection</ModalHeader>
          <ModalCloseButton disabled={handling} onClick={_onClose} />
          <ModalBody>
            <VStack gap={4}>
              <Input
                placeholder="Collection Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={_onClose}
              disabled={handling}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onSubmit} isLoading={handling}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
