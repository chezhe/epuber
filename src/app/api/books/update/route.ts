import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const data = await request.json()

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
    const title = data.title || '-'
    const description = data.description || '-'
    const cover = data.cover || '-'

    const result =
      await sql`UPDATE ibooks SET title = ${title}, author = ${author}, publisher = ${publisher}, description = ${description}, cover = ${cover} WHERE uid = ${uid} AND id = ${data.id};`

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
