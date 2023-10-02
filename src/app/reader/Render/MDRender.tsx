import { Book, Chapter } from '@/types'
import { Box, Heading, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import SimpleMarkdown, {
  Output,
  SingleASTNode,
  State,
} from '@khanacademy/simple-markdown'
import TurndownService from 'turndown'
import { XMLParser } from 'fast-xml-parser'

const turndownService = new TurndownService({
  headingStyle: 'atx',
})
turndownService.remove('script')
turndownService.remove('style')
turndownService.remove('title')
turndownService.remove('br')

// function getAnchorTarget(id: string, tree: any) {
//   if (!tree) {
//     return null
//   }
//   if (Array.isArray(tree)) {
//     return tree.find((node: any) => {
//       if (node['@_id'] === id) {
//         return true
//       }
//       return getAnchorTarget(id, node)
//     })
//   }
//   if (typeof tree === 'object') {
//     return getAnchorTarget(id, Object.values(tree))
//   }
//   return null
// }

const parser = new XMLParser({
  ignoreAttributes: false,
  ignorePiTags: true,
  // preserveOrder: true,
  unpairedTags: ['hr', 'br', 'link', 'meta'],
  stopNodes: ['*.pre', '*.script'],
  processEntities: true,
  htmlEntities: true,
  trimValues: true,
  removeNSPrefix: true,
  allowBooleanAttributes: true,
})

const defaultOutput = SimpleMarkdown.outputFor(
  SimpleMarkdown.defaultRules,
  'react'
)

export default function MDRender({
  activeChapter,
  book,
}: {
  activeChapter?: Chapter
  book?: Book
}) {
  useEffect(() => {
    document.getElementById('reader-wrap')?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [activeChapter?.src])

  const md = turndownService.turndown(activeChapter?.content ?? '')
  const _nodes = SimpleMarkdown.defaultBlockParse(md)
  const { html } = parser.parse(activeChapter?.content ?? '')
  console.log('body', html?.body)

  const output = SimpleMarkdown.outputFor(
    {
      ...SimpleMarkdown.defaultRules,
      link: {
        ...SimpleMarkdown.defaultRules.link,
        react: function (
          node: SingleASTNode,
          output: Output<any>,
          state: State
        ) {
          const href = SimpleMarkdown.sanitizeUrl(node.target)
          if (!href?.startsWith('http') && href?.includes('#')) {
            // const target = getAnchorTarget(href?.split('#')?.[1], html?.body)
          }
          return (
            <Text
              key={state.key}
              color="blue.400"
              display={'inline'}
              cursor={'pointer'}
            >
              {output(node.content, state)}
            </Text>
          )
        },
      },
      heading: {
        ...SimpleMarkdown.defaultRules.heading,
        react: function (
          node: SingleASTNode,
          output: Output<any>,
          state: State
        ) {
          return (
            <Heading key={state.key} textAlign={'center'}>
              {output(node.content, state)}
            </Heading>
          )
        },
      },
    },
    'react'
  )

  return (
    <Box
      id="reader-wrap"
      w="100%"
      p={8}
      fontSize={24}
      overflowY={'scroll'}
      lineHeight={2}
    >
      {output(_nodes)}
    </Box>
  )
}
