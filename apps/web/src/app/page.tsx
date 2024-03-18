'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function App() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/listings')
  }, [])

  return <div className="index-page"></div>
}
