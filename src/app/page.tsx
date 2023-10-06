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

function App() {
  return (
    <ScrollContainer scrollAxis="y" height="100vh" scrollSnapType="y mandatory">
      <HStack>
        <Link href="/">
          <Img src="/readit.png" w={20} />
        </Link>
      </HStack>
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
