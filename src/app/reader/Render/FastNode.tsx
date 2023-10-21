import { BookContext } from '@/hooks/BookContext'
import { Box, Divider, Heading, Img, Text } from '@chakra-ui/react'
import { useContext } from 'react'

export default function FastNode({ nodes }: { nodes: FNode[] }) {
  return (
    <>
      {nodes.map((node, idx) => {
        const keys = Object.keys(node)
        if (keys.length === 1 && keys[0] === ':@') {
          return null
        }
        let key = keys[0]
        if (keys.length > 1) {
          key = keys.find((k) => k !== ':@') || ''
        }
        if (key === '') {
          return null
        }
        const attrs = node[':@']
        const children = node[key]

        // if (!children || (Array.isArray(children) && children.length === 0)) {
        //   return null
        // }
        if (['string', 'number'].includes(typeof children)) {
          return (
            <Text key={idx} display={'inline'}>
              {children}
            </Text>
          )
        }
        console.log('###children', children)

        if (!Array.isArray(children) && children?.has('#text')) {
          return (
            <Text key={idx} display={'inline'}>
              {children['#text']}
            </Text>
          )
        }
        if (key === 'br') {
          return <br key={idx} />
        }
        if (key === 'hr') {
          return <Divider key={idx} h={1} bg="blue.300" my={16} />
        }
        if (key === 'blockquote') {
          return (
            <Box
              key={idx}
              borderLeftWidth={4}
              pl={6}
              py={4}
              my={4}
              mx={6}
              borderLeftColor={'blue.400'}
              bg="whiteAlpha.300"
              fontStyle={'italic'}
              fontSize={'smaller'}
            >
              <FastNode nodes={children} />
            </Box>
          )
        }
        if (key === 'div') {
          return (
            <Box key={idx}>
              <FastNode nodes={children} />
            </Box>
          )
        }
        if (['h1', 'h2', 'h3'].includes(key)) {
          return (
            <Heading key={idx} textAlign={'center'} my={8}>
              <FastNode nodes={children} />
            </Heading>
          )
        }
        if (key === 'span') {
          return (
            <Text key={idx} display={'inline'}>
              <FastNode nodes={children} />
            </Text>
          )
        }
        if (key === 'p') {
          return (
            <Text key={idx}>
              <FastNode nodes={children} />
            </Text>
          )
        }
        if (key === 'sup') {
          return (
            <sup key={idx} style={{ marginRight: 4, marginLeft: 2 }}>
              <FastNode nodes={children} />
            </sup>
          )
        }
        if (key === 'a') {
          return (
            <Text
              color="blue.400"
              display={'inline'}
              title={attrs['@_href']}
              cursor={'pointer'}
            >
              <FastNode nodes={children} />
            </Text>
          )
        }
        if (key === 'img') {
          console.log('attrs', attrs, node)

          return <ImageNode key={idx} attrs={attrs} />
        }
      })}
    </>
  )
}

function ImageNode({ attrs }: { attrs: Attr }) {
  const book = useContext(BookContext)
  const src = attrs['@_src'] || ''
  if (!src) {
    return null
  }
  const alt = attrs['@_alt'] || ''
  const img = book?.images?.find((i) => i.key?.includes(src))
  return <Img src={img?.url} alt={alt} m="0 auto" my={6} />
}

interface Attr {
  '@_id'?: string
  '@_href'?: string
  '@_class'?: string
  '@_src'?: string
  '@_alt'?: string
}

interface FNode {
  ':@': Attr
  [key: string]: any
}
