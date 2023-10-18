import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const data = await request.json()

  try {
    const supabase = createRouteHandlerClient({ cookies })
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('Not authorized')
    }
    const uid = user.id
    const author = JSON.stringify(data.author) || '[]'
    const publisher = JSON.stringify(data.publisher) || '[]'
    const language = JSON.stringify(data.language) || '[]'
    const title = data.title || '-'
    const rights = data.rights || '-'
    const description = data.description || '-'
    const cover = data.cover || '-'
    const file = data.file || '-'

    await sql`INSERT INTO ebooks (uid, title, author, file, cover, publisher, language, description, rights, deleted) VALUES (${uid}, ${title}, ${author}, ${file}, ${cover}, ${publisher}, ${language}, ${description}, ${rights}, FALSE);`

    const result = await sql`SELECT * FROM ebooks WHERE uid = ${uid} LIMIT 10;`
    return NextResponse.json({ books: result.rows }, { status: 200 })
  } catch (error) {
    console.log('error', error)

    return NextResponse.json({ error }, { status: 500 })
  }
}
