import React from 'react'

export default function Error({ error }) {
  return <p className="text-center text-danger">{error?.message}</p>
}
