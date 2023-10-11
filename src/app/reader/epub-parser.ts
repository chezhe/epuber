import { Metadata, Chapter } from '@/types'
import JSZip from 'jszip'
import { parseStringPromise } from 'xml2js'

const zip = new JSZip()

export async function parseEpub(file?: File) {
  if (!file) {
    throw new Error('File is required')
  }
  const detail = await zip.loadAsync(file)
  console.log('detail', detail)
  const fileKeys = Object.keys(detail.files)
  const opfFileKey = fileKeys.find((key) => key.endsWith('.opf'))
  let folder = opfFileKey?.split('/')[0]
  folder = folder?.endsWith('opf') ? '' : folder + '/'
  if (!opfFileKey) {
    throw new Error('Invalid epub file')
  }
  const opfFile = detail.files[opfFileKey]
  const opfContent = await opfFile.async('string')
  const opf = await parseStringPromise(opfContent)
  console.log('opf', opf)

  const ncxFileKey = fileKeys.find((key) => key.endsWith('.ncx'))
  if (!ncxFileKey) {
    throw new Error('Invalid epub file')
  }
  const ncxFile = detail.files[ncxFileKey]
  const ncxContent = await ncxFile.async('string')
  const ncx = await parseStringPromise(ncxContent)
  console.log('ncx', ncx)

  const metadata = getMetadata(opf.package.metadata, ncx)
  const chapters = await getChapters(ncx, detail, folder)

  const imageKeys = fileKeys.filter((key) => {
    return ['jpeg', 'jpg', 'png'].includes(key.split('.').pop() || '')
  })
  const images = await Promise.all(
    imageKeys.map(async (key) => {
      const file = detail.files[key]
      if (file) {
        const blob = await file.async('blob')
        const url = URL.createObjectURL(blob)

        return {
          key,
          url,
        }
      }
    })
  )
  return {
    metadata,
    chapters,
    images,
  }
}

function extractValue(v: any) {
  if (!v) {
    return ''
  }
  if (typeof v === 'string') {
    return v
  }
  if (Array.isArray(v)) {
    return extractValue(v[0])
  }
  if (typeof v === 'object' && v['_']) {
    return v['_']
  }
  return ''
}

function getMetadata(metadata: any[], ncx: any): Metadata | undefined {
  if (metadata.length) {
    const md = metadata[0]
    return {
      title: extractValue(md['dc:title']),
      author: (md['dc:creator'] || [])?.map(extractValue),
      publisher: (md['dc:publisher'] || [])?.map(extractValue),
      language: (md['dc:language'] || [])?.map(extractValue),
      description: extractValue(md['description']),
      rights: extractValue(md['dc:rights']),
    }
  }

  if (ncx.ncx) {
    return {
      title: ncx.ncx.docTitle[0]['text'][0],
      author: ncx.ncx.docAuthor.map((t: any) => t['text']),
    }
  }
}

async function extractNavPoint(navPoint: any, detail: any, folder: string) {
  const title = navPoint.navLabel[0].text[0]
  const playOrder = navPoint['$'].playOrder

  const content = navPoint.content[0]['$']
  const src = content.src
  let file = detail.files[folder + src]

  if (!file) {
    if (src.includes('#')) {
      file = detail.files[folder + src.split('#')[0]]
    }
  }
  let _content = ''
  try {
    _content = await file.async('string')
  } catch (error) {
    console.log('error', error)
  }

  let items = undefined
  if (navPoint.navPoint) {
    items = await Promise.all(
      navPoint.navPoint.map(async (navPoint: any) => {
        return await extractNavPoint(navPoint, detail, folder)
      })
    )
  }

  return {
    src,
    title,
    playOrder: Number(playOrder),
    content: _content,
    chapters: items,
  }
}

async function getChapters(
  ncx: any,
  detail: JSZip,
  folder: string
): Promise<Chapter[]> {
  const navMap = ncx.ncx.navMap[0]
  const navPoints = navMap.navPoint

  const toc = await Promise.all(
    navPoints.map(async (navPoint: any) => {
      return await extractNavPoint(navPoint, detail, folder)
    })
  )

  return toc
}

function parseHTML(html: string) {}
