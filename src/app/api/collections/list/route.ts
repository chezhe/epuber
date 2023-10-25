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
    const result =
      await sql`SELECT * FROM icollections WHERE uid = ${user?.id} ORDER BY updated_at DESC LIMIT 100;`
    return NextResponse.json(result.rows, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
