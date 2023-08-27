'use client'

import { HStack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { Document, Page } from 'react-pdf'
import * as pdfjs from 'pdfjs-dist'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import { useWindowSize } from '@uidotdev/usehooks'
import { BookInfo, Outline } from '@/types'
import { Bookmark, List, PanelLeftClose } from 'lucide-react'
import ToolBar from '@/components/ToolBar'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
}

function App() {
  const [numPages, setNumPages] = useState<number>()
  const [outlines, setOutlines] = useState<Outline[]>([])
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [metadata, setMetadata] = useState<BookInfo>()
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })

  const size = useWindowSize()

  const onDocumentLoadSuccess = async (doc: PDFDocumentProxy) => {
    setNumPages(doc.numPages)
    setOutlines(await doc.getOutline())
    const metadata = await doc.getMetadata()
    setMetadata(metadata.info as BookInfo)
  }

  return (
    <VStack spacing={0}>
      <ToolBar outlines={outlines} title={metadata?.Title} />
      <HStack bg="yellow.300" w="100vw" h="100%" spacing={0}>
        <VStack
          h="100%"
          maxH="100vh"
          overflowY="scroll"
          bg="blue.300"
          alignItems="center"
        >
          <Document
            file="./example.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={console.error}
            options={options}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={size.width ? size.width - (isOpen ? 300 : 0) : 800}
                canvasBackground="white"
              />
            ))}
          </Document>
        </VStack>
      </HStack>
    </VStack>
  )
}

export default App
