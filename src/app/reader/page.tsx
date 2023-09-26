'use client'

import { HStack, Input, Text, VStack } from '@chakra-ui/react'
import ToolBar from './ToolBar'
import JSZip from 'jszip'
import { parseEpub } from './epub-parser'

export default function Reader() {
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      parseEpub(file)
    } catch (error) {
      console.log('error', error)
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
