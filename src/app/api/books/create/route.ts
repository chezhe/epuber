import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()

  try {
    const author = data.author[0]
    const publisher = data.publisher[0]
    const language = data.language[0]
    console.log(
      `INSERT INTO book4 (uid, title, author, file, cover, publisher, language, description, rights) VALUES ('${data.user}', '${data.title}', '${author}', '${data.file}', '${data.cover}', '${publisher}', '${language}', '${data.description}', '');`
    )
    await sql`INSERT INTO book4 (uid, title, author, file, cover, publisher, language, description, rights) VALUES ('${data.user}', '${data.title}', '${author}', '${data.file}', '${data.cover}', '${publisher}', '${language}', '${data.description}', '');`
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  const books = await sql`SELECT * FROM books;`
  return NextResponse.json({ books }, { status: 200 })
}
