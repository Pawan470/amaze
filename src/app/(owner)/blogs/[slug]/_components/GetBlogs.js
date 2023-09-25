'use client'
import { decodeId, isValueExist } from '@/utils/utils'
import { AUTH_SERVICE } from '@/services'
import { Container } from 'react-bootstrap'

async function getData(blogId) {
  const res = await fetch(AUTH_SERVICE.GET_BLOGS + `?blogId=${blogId}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function GetBlogs({ params }) {
  const data = await getData(decodeId(params.slug))
  const blogDetails = data?.data || {}

  return (
    <Container>
      <h1>{isValueExist(blogDetails.title)}</h1>
      <p>{isValueExist(blogDetails.description)}</p>
    </Container>
  )
}
