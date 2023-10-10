import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  console.log('email', email, 'password', password)

  const supabase = createRouteHandlerClient({ cookies })

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
    },
  })

  if (error) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
    })
  }

  return NextResponse.json({
    status: 'ok',
    message: 'Check email to continue sign in process',
  })
}
