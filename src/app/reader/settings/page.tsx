'use client'

import { CloseIcon } from '@chakra-ui/icons'
import { HStack, Heading, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const navs = ['Account', 'Reader']

export default function Settings() {
  const router = useRouter()

  useEffect(() => {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.back()
      }
    })
    return () => window.removeEventListener('keydown', () => {})
  }, [])

  return (
    <>
      <VStack w="100%" flex={1} h="100vh" alignItems="flex-start" p={8}>
        <HStack w="100%" alignItems="center" justifyContent="space-between">
          <Heading size="2xl">Settings</Heading>
          <CloseIcon
            boxSize={4}
            cursor="pointer"
            onClick={() => {
              router.back()
            }}
          />
        </HStack>
        <HStack mt={4} flex={1} alignItems="stretch">
          <VStack alignItems="flex-end" pr={4} w={120} borderRightWidth={4}>
            {navs.map((nav) => (
              <Text key={nav} fontSize={18}>
                {nav}
              </Text>
            ))}
          </VStack>
          <VStack flex={1}></VStack>
        </HStack>
      </VStack>
    </>
  )
}
