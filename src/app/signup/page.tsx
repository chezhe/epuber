import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  Button,
  Text,
  HStack,
} from '@chakra-ui/react'
import Link from 'next/link'

export default function SignUp() {
  return (
    <HStack
      h="100vh"
      bg="red.300"
      alignItems={'center'}
      justifyContent={'center'}
    >
      <VStack w={{ base: 600, md: 300 }}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>

        <Button w="100%" mt={4} colorScheme="teal" type="submit">
          Sign Up
        </Button>

        <Link href="/signup">
          <Text color="blue.600">{'Already have a account? Login now.'}</Text>
        </Link>
      </VStack>
    </HStack>
  )
}
