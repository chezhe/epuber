'use client'

import { Search } from 'lucide-react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Input,
  HStack,
  VStack,
  Text,
  Box,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useEffect, useMemo, useState } from 'react'
import { Book, Chapter } from '@/types'
import TurndownService from 'turndown'
import _ from 'lodash'
import { findChapter } from '@/utils/book'
import useDark from '@/hooks/useDark'

const turndownService = new TurndownService({
  headingStyle: 'atx',
})
turndownService.remove('script')
turndownService.remove('style')
turndownService.remove('title')
turndownService.remove('br')

export default function SearchBox({
  book,
  setActiveChapter,
}: {
  book?: Book
  setActiveChapter: (chapter: Chapter | undefined) => void
}) {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false })
  const [keyword, setKeyword] = useState('')
  const dark = useDark()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        onOpen()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const contents = useMemo(() => {
    if (!book) {
      return []
    }

    return _.flatten(
      book.chapters?.map((chapter) => {
        const md = turndownService.turndown(chapter?.content ?? '')
        const subc = chapter?.chapters?.map((c) => {
          const md = turndownService.turndown(c?.content ?? '')
          return md
            .split('\n')
            .filter((line) => line.trim())
            .map((line) => {
              return {
                p: line,
                c: c.src,
                t: c.title,
              }
            })
        })

        const c = md
          .split('\n')
          .filter((line) => line.trim())
          .map((line) => {
            return {
              p: line,
              c: chapter.src,
              t: chapter.title,
            }
          })

        return [...c, ..._.flatten(subc ?? [])]
      })
    )
  }, [book])

  const onChange = (e: any) => {
    const v = e.target.value
    setKeyword(v)
    if (v.trim()) {
    }
  }

  return (
    <>
      <Search size={24} color="#666" cursor="pointer" onClick={onOpen} />
      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          justifyContent="center"
          alignItems="center"
          mt={24}
          borderRadius={2}
        >
          <HStack
            alignItems="center"
            justifyContent="center"
            p={2}
            px={4}
            w="100%"
          >
            <SearchIcon boxSize={6} color="gray.300" />

            <Input
              placeholder="Search"
              size="lg"
              outline="none"
              focusBorderColor="transparent"
              borderColor="transparent"
              width="100%"
              _focus={{ border: '0px' }}
              color={dark ? 'whiteAlpha.800' : 'blackAlpha.800'}
              fontSize={24}
              value={keyword}
              onChange={onChange}
            />
          </HStack>
          {keyword.trim() && (
            <VStack maxH={400} overflowY={'scroll'}>
              {contents
                .filter((c) => c.p.includes(keyword.trim()))
                .map((c, idx) => {
                  const p = c.p.replace(keyword, `<mark>${keyword}</mark>`)
                  return (
                    <Box
                      key={idx}
                      color={dark ? 'whiteAlpha.600' : 'gray.600'}
                      cursor={'pointer'}
                      w="100%"
                      px={4}
                      py={2}
                      borderBottomWidth={1}
                      onClick={() => {
                        const chapter = findChapter(book?.chapters ?? [], c.c)
                        if (chapter) {
                          setActiveChapter(chapter)
                          onClose()
                        }
                      }}
                    >
                      <Text>{c.p}</Text>
                      <Text fontWeight={600}>{c.t}</Text>
                    </Box>
                  )
                })}
            </VStack>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
