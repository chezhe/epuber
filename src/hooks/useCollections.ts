import { SQLCollection, SubEvent } from '@/types'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useEffect } from 'react'
import * as PubSub from 'pubsub-js'
import useNav from './useNav'

const collectionsAtom = atomWithStorage<SQLCollection[]>('collections', [])

export default function useCollections() {
  const [collections, setCollections] = useAtom(collectionsAtom)
  const { nav } = useNav()
  useEffect(() => {
    async function fetchCollections() {
      fetch('/api/collections/list')
        .then((res) => res.json())
        .then((res) => {
          if (Array.isArray(res)) {
            setCollections(res)
          }
        })
        .catch((err) => setCollections([]))
    }

    fetchCollections()

    const listner = PubSub.subscribe(
      SubEvent.REFRESH_COLLECTIONS,
      fetchCollections
    )

    return () => {
      PubSub.unsubscribe(listner)
    }
  }, [])

  return {
    collections,
    current: collections.find((c) => c.title === nav?.active),
  }
}
