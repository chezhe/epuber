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
            <VStack gap={2} alignItems={'flex-start'}>
              {chapters?.map((t, idx) => {
                const isActive = activeChapter?.src === t.src
                return (
                  <VStack
                    key={idx}
                    w="100%"
                    justifyContent={'space-between'}
                    cursor={'pointer'}
                  >
                    <Text
                      w="100%"
                      fontSize={18}
                      fontWeight={600}
                      bg={isActive ? 'blackAlpha.400' : undefined}
                      color={isActive ? 'blue.500' : ''}
                      px={4}
                      py={2}
                      onClick={() => {
                        setActiveChapter?.(t)
                        onClose()
                      }}
                    >
                      {t.title}
                    </Text>
                    {t?.chapters && (
                      <VStack w="100%">
                        {t.chapters.map((_t, idx) => {
                          const isActive = activeChapter?.src === _t.src
                          return (
                            <HStack
                              key={idx}
                              w="100%"
                              justifyContent={'space-between'}
                              gap={6}
                              pl={8}
                              py={2}
                              cursor={'pointer'}
                              bg={isActive ? 'blackAlpha.400' : undefined}
                              onClick={() => {
                                setActiveChapter?.(_t)
                                onClose()
                              }}
                            >
                              <Text
                                fontSize={16}
                                fontWeight={600}
                                color={isActive ? 'blue.500' : ''}
                              >
                                {_t.title}
                              </Text>
                            </HStack>
                          )
                        })}
                      </VStack>
                    )}
                  </VStack>
                )
              })}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
