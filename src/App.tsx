import { Button, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { Document, Page } from 'react-pdf'
import * as pdfjs from 'pdfjs-dist'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import type { PDFDocumentProxy } from 'pdfjs-dist'

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

  const onDocumentLoadSuccess = (doc: PDFDocumentProxy) => {
    // setNumPages(numPages)
    setNumPages(30)
  }

  return (
    <VStack bg="yellow.300" w="100vw" h="100%">
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
            width={800}
            canvasBackground="white"
          />
        ))}
      </Document>
      {/* <Button>Open Book</Button> */}
    </VStack>
  )
}

export default App
