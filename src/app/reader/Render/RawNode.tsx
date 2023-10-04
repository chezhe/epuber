import { BookContext } from '@/hooks/BookContext'
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Text,
  Heading,
  Box,
  Img,
} from '@chakra-ui/react'
import type { DocumentFragment } from 'parse5/dist/tree-adapters/default.d.ts'
import { useContext } from 'react'

function ImageNode({ node }: { node?: DocumentFragment.ChildNode }) {
  const book = useContext(BookContext)
  const src = node.attrs.find((attr: any) => attr.name === 'src')?.value
  const alt = node.attrs.find((attr: any) => attr.name === 'alt')?.value
  const img = book?.images?.find((i) => src?.includes(i.key))
  return <Img src={img?.url} alt={alt} m="0 auto" my={6} />
}

function LinkNode({ node }: { node?: DocumentFragment.ChildNode }) {
  const href = node.attrs.find((attr: any) => attr.name === 'href')?.value
  return (
    <Text color="blue.400" display={'inline'} title={href}>
      {node.value}
      <RawNode nodes={node.childNodes} />
    </Text>
  )
}

export default function RawNode({
  nodes,
}: {
  nodes?: DocumentFragment.ChildNode[]
}) {
  if (!nodes || nodes.length === 0) {
    return null
  }
  return (
    <>
      {nodes
        .filter((node) => {
          if (node.nodeName === '#text' && node.value.trim() === '') {
            return false
          }
          return true
        })
        .map((node, idx) => {
          if (node.nodeName === 'br') {
            return <br />
          }
          if (node.nodeName === 'div') {
            return (
              <Box key={idx}>
                <RawNode nodes={node.childNodes} />
              </Box>
            )
          }

          if (node.nodeName === 'img') {
            return <ImageNode key={idx} node={node} />
          }

          if (node.nodeName === '#text') {
            return (
              <Text key={idx} display={'inline'}>
                {node.value}
                <RawNode nodes={node.childNodes} />
              </Text>
            )
          }

          if (node.nodeName === 'p') {
            return (
              <Text key={idx}>
                <RawNode nodes={node.childNodes} />
              </Text>
            )
          }

          if (node.nodeName === 'sup') {
            return (
              <sup key={idx} style={{ marginRight: 8, marginLeft: 2 }}>
                <RawNode nodes={node.childNodes} />
              </sup>
            )
          }

          if (node.nodeName === 'li') {
            return (
              <ListItem key={idx}>
                <RawNode nodes={node.childNodes} />
              </ListItem>
            )
          }

          if (node.nodeName === 'ul') {
            return (
              <UnorderedList key={idx}>
                <RawNode nodes={node.childNodes} />
              </UnorderedList>
            )
          }

          if (node.nodeName === 'ol') {
            return (
              <OrderedList key={idx}>
                <RawNode nodes={node.childNodes} />
              </OrderedList>
            )
          }

          if (node.nodeName === 'a') {
            return <LinkNode key={idx} node={node} />
          }

          if (['h1', 'h2', 'h3'].includes(node.nodeName)) {
            return (
              <Heading key={idx} textAlign={'center'} my={8}>
                <RawNode nodes={node.childNodes} />
              </Heading>
            )
          }

          return null
        })}
    </>
  )
}
