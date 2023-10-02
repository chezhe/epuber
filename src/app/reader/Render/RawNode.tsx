import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Text,
  Heading,
} from '@chakra-ui/react'

export default function RawNode({
  tagName,
  node,
}: {
  tagName: string
  node: any
}) {
  console.log('tagName', tagName, node)
  if (!node) {
    return null
  }
  if (tagName.startsWith('@_')) {
    return null
  }

  if (tagName === '#text') {
    return <Text>{node}</Text>
  }

  if (tagName === 'ul') {
    return (
      <UnorderedList>
        {node['li'].map((item: any, idx: number) => {
          return (
            <ListItem key={idx}>
              <RawNode tagName="li" node={item} />
            </ListItem>
          )
        })}
      </UnorderedList>
    )
  }
  if (tagName === 'ol') {
    return (
      <OrderedList>
        {node['li'].map((item: any, idx: number) => {
          return <ListItem key={idx}>Lorem ipsum dolor sit amet</ListItem>
        })}
      </OrderedList>
    )
  }

  if (tagName === 'a') {
    return <Text color="blue.400">{node['#text']}</Text>
  }

  if (tagName === 'h1') {
    return <Heading textAlign={'center'}>{node['#text']}</Heading>
  }

  if (Array.isArray(node)) {
    return (
      <>
        {node.map((n: any, idx: number) => {
          return <RawNode key={idx} tagName={tagName} node={n} />
        })}
      </>
    )
  }

  if (typeof node === 'object') {
    return (
      <>
        {Object.keys(node).map((key: string, idx: number) => {
          return <RawNode key={idx} tagName={key} node={node[key]} />
        })}
      </>
    )
  }

  return null
}
