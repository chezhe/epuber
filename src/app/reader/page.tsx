'use client'

import { HStack, Input, Text, VStack } from '@chakra-ui/react'
import {
  MemoizedEpub,
  SanitizedEpub,
  MemoizedEpubAndSanitized,
} from '@jcsj/epub'
import ToolBar from './ToolBar'

export default function Reader() {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // MemoizedEpub(file).then((epub) => {
      //   //...
      // })
    }
  }
  return (
    <VStack h="100vh">
      <ToolBar title="The Handmaid's Tale" />
      <HStack>
        <Input
          placeholder="Open Your .epub book"
          type="file"
          onChange={onFileChange}
        />
      </HStack>
      <Text fontSize={24}>Sphinx of black quartz, judge my vow</Text>
    </VStack>
  )
}
