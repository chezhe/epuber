'use client'

import useDark from '@/hooks/useDark'
import { VStack, HStack, chakra, Heading } from '@chakra-ui/react'
import { User } from '@supabase/supabase-js'
import useBooks from '@/hooks/useBooks'
import useNav from '@/hooks/useNav'

export default function Collection({ user }: { user: User | null }) {
  const dark = useDark()
  const books = useBooks()
  const { nav } = useNav()

  return (
    <VStack
      w="calc(100% - 240px)"
      h={'100vh'}
      alignItems={'flex-start'}
      overflowY={'scroll'}
      // bg={!dark ? 'whiteAlpha.700' : 'blackAlpha.700'}
      color={!dark ? 'blackAlpha.800' : 'whiteAlpha.800'}
      bgImage={`url(https://ke32uptj4ahgsaub.public.blob.vercel-storage.com/cover-7AVETtKBeZgFiTnolohmqRBIcXHiNL.jpeg)`}
      bgSize={'cover'}
      bgPos={'center'}
      pos={'relative'}
    >
      <VStack
        backdropFilter={'blur(80px) brightness(0.5)'}
        pos={'absolute'}
        left={0}
        top={0}
        p={8}
        pt={2}
        w="100%"
        minH="100vh"
      >
        <HStack
          w="100%"
          alignItems={'center'}
          justifyContent={'space-between'}
          p={4}
          px={0}
          zIndex={10}
        >
          <Heading>{nav?.active}</Heading>
        </HStack>
      </VStack>
    </VStack>
  )
}
