import { Book, Chapter } from '@/types'
import { Box, Heading, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import SimpleMarkdown, {
  Output,
  SingleASTNode,
  State,
} from '@khanacademy/simple-markdown'

const output = SimpleMarkdown.outputFor(
  {
    ...SimpleMarkdown.defaultRules,
    link: {
      ...SimpleMarkdown.defaultRules.link,
      react: function (node: SingleASTNode, output: Output<any>, state: State) {
        return SimpleMarkdown.reactElement('a', String(state.key), {
          href: SimpleMarkdown.sanitizeUrl(node.target),
          title: node.title,
          children: output(node.content, state),
        })
      },
    },
  },
  'react'
)

export default function BookRender({
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

  return (
    <Box id="reader-wrap" w="100%" p={8} fontSize={24} overflowY={'scroll'}>
      {output(SimpleMarkdown.defaultBlockParse(activeChapter?.content ?? ''))}
    </Box>
  )
}
