import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json([], { status: 200 })
    }
    const { rows } =
      await sql`SELECT * FROM icollections WHERE uid = ${user?.id} ORDER BY updated_at DESC LIMIT 100;`

    const collection_ids: number[] = rows.map((t) => t.id)

    const { rows: book_id_rows } = await sql.query(
      `SELECT book_id, collection_id FROM icollection WHERE collection_id = ANY($1::int[]);`,
      [collection_ids]
    )

    const collections = rows.map((r) => {
      return {
        ...r,
        book_ids: book_id_rows
          .filter((b) => b.collection_id === r.id)
          .map((b) => b.book_id),
      }
    })

    return NextResponse.json(collections, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
