'use client'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Divider,
  Text,
  ModalCloseButton,
  ModalHeader,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export default function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState<'login' | 'signup'>('login')

  const toast = useToast()
  const onSubmit = async () => {
    try {
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email')
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      const formdata = new FormData()
      formdata.append('email', email)
      formdata.append('password', password)
      if (type === 'login') {
        // login
      } else {
        // signup
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        status: 'error',
      })
    }
  }
  return (
    <>
      <HStack>
        <Button
          variant={'outline'}
          bg="red.300"
          _hover={{ bg: 'red.400' }}
          color="whiteAlpha.900"
          borderRadius={2}
          px={6}
          onClick={() => {
            setType('login')
            onOpen()
          }}
        >
          Login
        </Button>
        <Button
          variant={'outline'}
          _hover={{ bg: 'whiteAlpha.400' }}
          color="blackAlpha.800"
          borderRadius={2}
          px={6}
          onClick={() => {
            setType('signup')
            onOpen()
          }}
        >
          Sign Up
        </Button>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color={'blackAlpha.800'} />
          <ModalHeader
            color="blackAlpha.800"
            fontSize={32}
            textAlign={'center'}
          >
            Welcome to epuber
          </ModalHeader>
          <VStack p={4} px={8}>
            <FormControl>
              <FormLabel color="blackAlpha.800" fontWeight={600}>
                Email
              </FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                borderRadius={2}
                color={'blackAlpha.800'}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="blackAlpha.800" fontWeight={600}>
                Password
              </FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                borderRadius={2}
                color={'blackAlpha.800'}
              />
            </FormControl>

            <Button
              w="100%"
              mt={2}
              bg="red.300"
              _hover={{ bg: 'red.400' }}
              color="whiteAlpha.900"
              borderRadius={2}
              px={6}
            >
              {type === 'login' ? 'Login' : 'Sign Up'}
            </Button>

            <HStack w="100%">
              <Divider bg="red.300" />
              <Text color="blackAlpha.500" fontWeight={600}>
                OR
              </Text>
              <Divider bg="red.300" />
            </HStack>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  )
}
