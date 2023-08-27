import { Outline } from '@/types'
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  VStack,
  HStack,
  Text,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { List } from 'lucide-react'

export default function Chapters({
  outlines,
  title,
}: {
  outlines: Outline[]
  title?: string
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <List size={24} color="#666" cursor="pointer" onClick={onOpen} />
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader borderBottomWidth="1px">
            {title && title.length > 30
              ? title.substring(0, 30) + '...'
              : title}
          </DrawerHeader>
          <DrawerBody>
            <VStack alignItems="flex-start">
              {outlines.map((o) => {
                return (
                  <HStack
                    key={o.title}
                    justifyContent="flex-start"
                    textAlign="left"
                    cursor="pointer"
                  >
                    <Text>{o.title}</Text>
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
