'use client'
import '@fontsource/inconsolata/400.css'
import '@fontsource/inconsolata/600.css'
import '@fontsource/inconsolata/700.css'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `'Inconsolata', sans-serif`,
    body: `'Inconsolata', sans-serif`,
  },
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  )
}
