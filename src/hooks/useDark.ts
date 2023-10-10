import { useColorMode } from '@chakra-ui/react'

export default function useDark() {
  const mode = useColorMode()

  return mode.colorMode === 'dark'
}
