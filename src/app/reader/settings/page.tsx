'use client'

import { HStack, Heading, Text, VStack } from '@chakra-ui/react'

const navs = ['Account', 'Reader']

export default function Settings() {
  return (
    <VStack w="100%" flex={1} h="100%" alignItems="flex-start">
      <Heading size="2xl">Settings</Heading>
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
  )
}
