import { Chapter } from '@/types'
import { List } from 'lucide-react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react'
import { useEffect } from 'react'

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
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Table of Content</DrawerHeader>

          <DrawerBody>
            <VStack gap={4} alignItems={'flex-start'}>
              {chapters?.map((t, idx) => {
                const isActive = activeChapter?.src === t.src
                return (
                  <HStack
                    key={idx}
                    w="100%"
                    justifyContent={'space-between'}
                    gap={6}
                    cursor={'pointer'}
                    onClick={() => {
                      setActiveChapter?.(t)
                      onClose()
                    }}
                  >
                    <Text
                      fontSize={18}
                      fontWeight={600}
                      color={isActive ? 'blue.500' : 'blackAlpha.900'}
                    >
                      {t.title}
                    </Text>
                    <Text color="blackAlpha.700">{t.playOrder}</Text>
                  </HStack>
                )
              })}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
