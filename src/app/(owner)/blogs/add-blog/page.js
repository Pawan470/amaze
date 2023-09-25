'use client'
import { postRequest } from '@/utils/axiosMethod'
import React from 'react'

export default function page() {
  const handle = async () => {
    for (let index = 0; index < 50; index++) {
      await postRequest('http://localhost:8000/blog', {
        title: `heading 2 ${index + index + Math.random()}`,
        description:
          'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum maydescription',
        tags: ['one', 'Two'],
      })
    }
  }
  return (
    <div className="container">
      add blog
      <div>
        <button onClick={handle}>add Blog</button>
      </div>
    </div>
  )
}
