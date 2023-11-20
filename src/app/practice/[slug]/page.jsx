'use client'
import React from 'react'
import { useParams } from 'next/navigation'

export default function Details() {
  const data = useParams()

  return (
    <div>
      <h1>Dynamic Page</h1>
      <p>Received ID: {data?.slug || 'no record'}</p>
    </div>
  )
}
