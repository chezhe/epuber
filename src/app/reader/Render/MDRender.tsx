import { Book, Chapter } from '@/types'
import {
  Box,
  Heading,
  Img,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react'
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

function getAnchorTarget(id: string, ps: any) {
  if (!ps) {
    return null
  }

  return ps.find((p: any) => {
    if (p['a']) {
      if (Array.isArray(p['a'])) {
        return p['a'].find((a) => a['@_id'] === id)
      }
      return p['a']['@_id'] === id
    }
    return false
  })
}

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

export default function MDRender({
  activeChapter,
  book,
  setActiveChapter,
}: {
  activeChapter?: Chapter
  book?: Book
  setActiveChapter: (chapter: Chapter | undefined) => void
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

  const anchorTargets = []
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
            const id = href?.split('#')?.[1]
            const target = getAnchorTarget(id, html?.body.p)

            if (target) {
              return (
                <Popover id={id}>
                  <PopoverTrigger>
                    <Text
                      key={state.key}
                      color="blue.400"
                      display={'inline'}
                      cursor={'pointer'}
                      mx={2}
                      title={href}
                    >
                      <sup>{output(node.content, state)}</sup>
                    </Text>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody p={4}>
                      <Text
                        fontSize={16}
                        fontWeight={600}
                        lineHeight={1.4}
                        letterSpacing={'widest'}
                      >
                        {target['#text']}
                      </Text>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )
            }
            const link = href?.split('#')?.[0]
            let chapter = book?.chapters?.find((c) => {
              return (
                c.src.includes(link) ||
                c.chapters?.find((cc) => cc.src.includes(link))
              )
            })

            if (chapter) {
              if (!chapter.src.includes(link)) {
                chapter = chapter?.chapters?.find((c) => c.src.includes(link))
              }

              return (
                <Text
                  key={state.key}
                  color="blue.400"
                  display={'inline'}
                  cursor={'pointer'}
                  onClick={() => setActiveChapter(chapter)}
                  title={href}
                >
                  {output(node.content, state)}
                </Text>
              )
            }
          }

          return (
            <Text
              key={state.key}
              color="blue.400"
              display={'inline'}
              cursor={'pointer'}
              title={href ?? ''}
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
      image: {
        ...SimpleMarkdown.defaultRules.image,
        react: function (
          node: SingleASTNode,
          output: Output<any>,
          state: State
        ) {
          const src = SimpleMarkdown.sanitizeUrl(node.target)
          const img = book?.images?.find((i) => src?.includes(i.key))
          if (img) {
            return (
              <Img
                key={state.key}
                src={img.url}
                alt={node.alt}
                title={node.title}
                margin="0 auto"
              />
            )
          }
          return null
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
      px={16}
      fontSize={24}
      overflowY={'scroll'}
      lineHeight={2}
    >
      {output(_nodes)}
    </Box>
  )
}
