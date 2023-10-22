import { Chapter } from '@/types'
import { List } from 'lucide-react'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import useDark from '@/hooks/useDark'

export default function Toc({
  chapters,
  activeChapter,
  setActiveChapter,
}: {
  chapters?: Chapter[]
  activeChapter?: Chapter
  setActiveChapter?: (chapter: Chapter) => void
}) {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false })
  const dark = useDark()
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'l') {
        onOpen()
        event.preventDefault()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <List size={24} color="#666" cursor="pointer" onClick={onOpen} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          color={!dark ? 'blackAlpha.800' : 'whiteAlpha.800'}
          bg={!dark ? 'gray.200' : 'gray.800'}
        >
          <DrawerCloseButton />
          <DrawerHeader>Table of Contents</DrawerHeader>

          <DrawerBody p={0}>
            <NavPoints
              navPoints={chapters ?? []}
              onSelect={(c) => {
                setActiveChapter?.(c)
                onClose()
              }}
              activeChapter={activeChapter}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

function NavPoints({
  navPoints,
  activeChapter,
  onSelect,
  indent = 0,
}: {
  navPoints: Chapter[]
  activeChapter?: Chapter
  onSelect: (chapter: Chapter) => void
  indent?: number
}) {
  if (navPoints.length === 0) {
    return null
  }
  return (
    <VStack w="100%" gap={2} alignItems={'flex-start'}>
      {navPoints.map((navPoint, idx) => {
        const isActive = activeChapter?.src === navPoint.src

        return (
          <VStack
            w="100%"
            justifyContent={'space-between'}
            cursor={'pointer'}
            pr={2}
          >
            <Text
              w="100%"
              fontSize={18}
              fontWeight={600}
              bg={isActive ? 'blackAlpha.400' : undefined}
              color={isActive ? 'blue.500' : ''}
              px={4}
              py={2}
              pl={4 * (indent + 1)}
              onClick={() => {
                onSelect(navPoint)
              }}
            >
              {navPoint.title}
            </Text>
            <NavPoints
              navPoints={navPoint.chapters ?? []}
              activeChapter={activeChapter}
              onSelect={onSelect}
              indent={indent + 1}
            />
          </VStack>
        )
      })}
    </VStack>
  )
}
