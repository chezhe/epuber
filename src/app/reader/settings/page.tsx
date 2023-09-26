'use client'

import { CloseIcon } from '@chakra-ui/icons'
import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const navs = ['Account', 'Reader']

export default function Settings() {
  const [active, setActive] = useState('Account')
  const router = useRouter()

  const pathname = usePathname()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && pathname === '/reader/settings') {
        router.back()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [pathname])

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
          <VStack alignItems="flex-end" pr={4} w={200} borderRightWidth={4}>
            {navs.map((nav) => (
              <Box
                key={nav}
                bg={active === nav ? 'whiteAlpha.500' : 'whiteAlpha.100'}
                px={6}
                py={1}
                borderRadius={4}
                cursor={'pointer'}
                onClick={() => setActive(nav)}
              >
                <Text fontSize={20}>{nav}</Text>
              </Box>
            ))}
          </VStack>
          <VStack flex={1}></VStack>
        </HStack>
      </VStack>
    </>
  )
}
