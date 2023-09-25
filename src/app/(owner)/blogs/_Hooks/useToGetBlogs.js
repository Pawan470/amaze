import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'
import { AUTH_SERVICE } from '@/services'
import { useToGetRequest } from '@/utils/axiosMethod'
import { encodeId, mergeUrlWithParams } from '@/utils/utils'
import { ROUTES } from '@/constants/routes'

export default function useToGetBlogs({ searchParams }) {
  const page = searchParams?.page ? parseFloat(searchParams?.page) : 1
  const paramSearchText = searchParams?.searchText || null
  const [searchText, setSearchText] = useState(paramSearchText)

  const router = useRouter()
  const params = {
    page,
    searchText: searchText || '',
  }
  const debouncedSearchText = useDebounce(searchText, 1500, () => {
    if (searchText !== null) {
      router.push(mergeUrlWithParams(ROUTES.BLOGS, params))
    }
  })

  const { data, isLoading, error } = useToGetRequest(
    AUTH_SERVICE.GET_BLOGS,
    ['GET_BLOGS', page, debouncedSearchText],
    params,
  )
  const changePage = (page) => {
    router.push(mergeUrlWithParams(ROUTES.BLOGS, { ...params, page }))
  }

  return {
    data: {
      blogs: data?.data || [],
      isLoading,
      error,
      page,
      totalBlogs: data?.pagination?.totalBlogs,
    },
    methods: {
      changePage,
      setSearchText,
      moveToDetailPage: (id) => {
        router.push(ROUTES.BLOGS_DETAILS.replace(':id', encodeId(id)))
      },
    },
  }
}
