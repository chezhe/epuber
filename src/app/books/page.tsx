import { HStack } from '@chakra-ui/react'
import SideBar from './SideBar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Content from './Content'

export const dynamic = 'force-dynamic'

export default async function Books() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <HStack h="100vh" gap={0} bg="whiteAlpha.900" alignItems={'flex-start'}>
      <SideBar />
      <Content user={user} />
    </HStack>
  )
}
