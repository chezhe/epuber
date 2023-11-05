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
    const book_id = data.book_id
    const collection_id = data.collection_id

    const collection =
      await sql`DELETE FROM icollection WHERE book_id = ${book_id} AND collection_id = ${collection_id};`

    return NextResponse.json(collection, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
