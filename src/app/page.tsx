'use client'

import { ScrollContainer, ScrollSection } from '@/components/Scrolls'
import {
  Button,
  Center,
  HStack,
  Heading,
  Img,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'
import { XStack } from 'tamagui'

function App() {
  return (
    <ScrollContainer scrollAxis="y" height="100vh" scrollSnapType="y mandatory">
      <XStack px={'$6'} py={'$3'}>
        <Link href="/">
          <Img src="/logo.png" w={40} />
        </Link>
      </XStack>
      <ScrollSection>
        <Center>
          <VStack>
            <Heading size="3xl">A modern book reader</Heading>
            <Link href="/books">
              <Button bg="red.300" size="lg">
                Try it
              </Button>
            </Link>
          </VStack>
        </Center>
      </ScrollSection>
    </ScrollContainer>
  )
}

export default App
