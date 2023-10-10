'use client'

import { EMAIL_REGEX } from '@/utils'
import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  Button,
  Text,
  HStack,
  Box,
  useToast,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('chezhe@hey.com')
  const [password, setPassword] = useState('zxasqw12')
  const [confirming, setConfirming] = useState(false)

  const toast = useToast()

  const router = useRouter()
  const onSubmit = async () => {
    try {
      setConfirming(true)
      if (!EMAIL_REGEX.test(email)) {
        throw new Error('Invalid email')
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      const formdata = new FormData()
      formdata.append('email', email)
      formdata.append('password', password)

      const result = await fetch('/api/auth/sign-in', {
        method: 'POST',
        body: formdata,
      }).then((res) => res.json())
      if (result.status === 'ok') {
        router.replace('/books')
      }
      setConfirming(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        status: 'error',
      })
      setConfirming(false)
    }
  }
  return (
    <HStack h="100vh" alignItems={'center'} justifyContent={'center'}>
      <Box w="60%" h="100%" bg="red.300"></Box>
      <VStack h="100%" w="40%" justifyContent={'center'} p={8}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button
          w="100%"
          mt={4}
          colorScheme="red"
          type="submit"
          isLoading={confirming}
          onClick={onSubmit}
        >
          Login
        </Button>

        <Link href="/signup">
          <Text color="blue.300">{'Already have a account? Login now.'}</Text>
        </Link>
      </VStack>
    </HStack>
  )
}
