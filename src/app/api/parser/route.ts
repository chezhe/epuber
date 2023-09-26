import { NextResponse } from 'next/server'
import EPub from 'epub'

export async function GET(request: Request) {
  try {
    const epub = new EPub('alice.epub')
    epub.on('end', function () {
      console.log(epub.metadata)
    })
    epub.on('error', function (err) {
      console.log('ERROR\n-----', err)
      throw err
    })
    epub.parse()
  } catch (error) {
    // console.log('error')
    throw error
    // return NextResponse.json(error)
  }
}
