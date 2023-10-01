import { Book, Chapter } from '@/types'
import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import SimpleMarkdown, {
  Output,
  SingleASTNode,
  State,
} from '@khanacademy/simple-markdown'
import TurndownService from 'turndown'

const turndownService = new TurndownService({
  headingStyle: 'atx',
})
turndownService.remove('script')
turndownService.remove('style')
turndownService.remove('title')
turndownService.remove('br')

function getAnchorTarget(
  href: string,
  nodes: SingleASTNode[]
): SingleASTNode | undefined {
  return nodes.find((node: SingleASTNode) => {
    if (node.type === 'link') {
      return node.target === href
    }
    if (node.type === 'paragraph' && Array.isArray(node.content)) {
      return !!getAnchorTarget(href, node.content)
    }

    return false
  })
}

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
          return SimpleMarkdown.reactElement('a', String(state.key), {
            href,
            title: node.title,
            children: output(node.content, state),
          })
        },
      },
    },
    'react'
  )

  return (
    <Box id="reader-wrap" w="100%" p={8} fontSize={24} overflowY={'scroll'}>
      {output(_nodes)}
    </Box>
  )
}
