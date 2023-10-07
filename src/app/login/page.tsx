import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  VStack,
  Input,
  Button,
} from '@chakra-ui/react'

export default function Login() {
  return (
    <VStack h="100vh">
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      <Button mt={4} colorScheme="teal" type="submit">
        Submit
      </Button>
    </VStack>
  )
}
