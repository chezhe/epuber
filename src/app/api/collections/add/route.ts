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
    // check if uid OWNs collection_id
    const uid = user.id
    const book_id = data.book_id
    const collection_ids = data.collection_ids

    const result = await Promise.all(
      collection_ids.map(async (collection_id: number) => {
        return await sql`INSERT INTO icollection (book_id, collection_id) VALUES (${book_id}, ${collection_id});`
      })
    )

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.log('error', error)

    return NextResponse.json({ error }, { status: 500 })
  }
}
