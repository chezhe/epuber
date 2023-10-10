import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  VStack,
  Input,
  Button,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'

export default function Login() {
  return (
    <VStack
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
          Login
        </Button>

        <Link href="/signup">
          <Text color="blue.600">{"Don't have a account? Sign Up"}</Text>
        </Link>
      </VStack>
    </VStack>
  )
}
