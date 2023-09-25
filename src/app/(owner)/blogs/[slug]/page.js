import { decodeId } from '@/utils/utils'
import GetBlogs from './_components/GetBlogs'
import { AUTH_SERVICE } from '@/services'

export async function generateMetadata({ params, searchParams }, parent) {
  const blogId = decodeId(params.slug)
  const res = await fetch(AUTH_SERVICE.GET_BLOGS + `?blogId=${blogId}`).then((res) => res.json())

  return {
    title: res.data.title,
  }
}

export default function Page({ params }) {
  return (
    <>
      <GetBlogs params={params} />
    </>
  )
}
