'use client'

import Shelf from './Shelf'
import useNav from '@/hooks/useNav'
import Collection from './Collection'
import { User } from '@supabase/supabase-js'
import Inspiration from './Inspiration'

export default function Content({ user }: { user: User | null }) {
  const { nav } = useNav()
  return (
    <>
      {nav?.category === 'Library' && <Shelf user={user} />}
      {nav?.category === 'Collections' && <Collection user={user} />}
      {nav?.category === 'Inspiration' && <Inspiration user={user} />}
    </>
  )
}
