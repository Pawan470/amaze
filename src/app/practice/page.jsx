'use client'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '@/actions/counter'
import { getPosts } from '@/actions/profile'

export default function Page() {
  const count = useSelector((state) => state.counter.value)
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const fetchUsers = () => {
    dispatch(getPosts())
  }

  if (profile.loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <button onClick={fetchUsers}> user </button>
      <button aria-label="Increment value" onClick={() => dispatch(increment())}>
        Increment
      </button>
      <span>{count}</span>
      <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
        Decrement
      </button>

      <ul>
        {profile?.entities?.map((item) => (
          <li key={item.id}> {item.title} </li>
        ))}
      </ul>
    </div>
  )
}
