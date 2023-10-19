import { ActiveNav } from '@/types'
import { useAtom, atom } from 'jotai'

const navAtom = atom<ActiveNav | undefined>({
  category: 'Library',
  active: 'All',
})

export default function useNav() {
  const [nav, setNav] = useAtom(navAtom)

  return {
    nav,
    setNav,
  }
}
