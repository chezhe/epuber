import JSZip from 'jszip'
import { parseString, parseStringPromise } from 'xml2js'

const zip = new JSZip()

export async function parseEpub(file?: File) {
  if (!file) {
    throw new Error('File is required')
  }
  const detail = await zip.loadAsync(file)
  console.log('detail', detail)
  const fileKeys = Object.keys(detail.files)
  const opfFileKey = fileKeys.find((key) => key.endsWith('.opf'))
  if (!opfFileKey) {
    throw new Error('Invalid epub file')
  }
  const opfFile = detail.files[opfFileKey]
  const opfContent = await opfFile.async('string')
  const opf = await parseStringPromise(opfContent)
  console.log('opf', opf)
}
