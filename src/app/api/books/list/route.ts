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
    const result =
      await sql`SELECT * FROM book11 WHERE uid = ${user?.id} LIMIT 10;`
    return NextResponse.json({ books: result.rows }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
