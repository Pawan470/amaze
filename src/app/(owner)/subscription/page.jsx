'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import usePreviousRoute from '@/hooks/usePreviousRoute'

export default function Subcsription(props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const prevPath = usePreviousRoute()
  console.log('prevPath====', prevPath)

  return (
    <div className="container">
      <p>Subcsription</p>
      <p>{sessionStorage.getItem('ok')}</p>
      <button
        onClick={() => {
          sessionStorage.setItem('ok', '12')
        }}
      >
        add
      </button>
      <br />
      <button
        onClick={() => {
          sessionStorage.removeItem('ok')
        }}
      >
        Remove
      </button>
    </div>
  )
}
