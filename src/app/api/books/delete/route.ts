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

    const result =
      await sql`UPDATE ibooks SET deleted = TRUE WHERE uid = ${uid} AND id = ${data.id};`
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
