'use client'
import { withRoleProtection } from '@/Hoc/withRoleProtection'
import { SYSTEM_ROLES } from '@/constants'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Pagination from '@/components/shared/Pagination/Pagination'
import { ROUTES } from '@/constants/routes'
import Loader from '@/components/shared/Loader'
import Error from '@/components/shared/Error/Error'
import useToGetBlogs from './_Hooks/useToGetBlogs'
import GoogleAutoComplete from '@/components/shared/GoogleAutoComplete'

export default function Blogs({ searchParams }) {
  const { data, methods } = useToGetBlogs({
    searchParams,
  })
  const blogs = data.blogs

  if (data.isLoading) return <Loader />
  if (data.error) return <Error error={error} />
  return (
    <div className="container">
      <h1>Blogs</h1>
      <input
        type="text"
        value={data.searchText}
        onChange={(e) => methods.setSearchText(e.target.value)}
      />

      {blogs.length > 0 ? (
        blogs?.map((item) => (
          <BlogCard item={item} key={item._id} moveToDetailPage={methods.moveToDetailPage} />
        ))
      ) : (
        <p className="text-center">No record found</p>
      )}

      {blogs.length < data.totalBlogs && (
        <Pagination currentPage={data.page} total={data.totalBlogs} onChange={methods.changePage} />
      )}
    </div>
  )
}

withRoleProtection(Blogs, [SYSTEM_ROLES.OWNER])

const BlogCard = ({ item, moveToDetailPage }) => {
  return (
    <Card className="mt-2">
      <Card.Body>
        <Card.Title className="c_point" onClick={() => moveToDetailPage(item._id)}>
          {item.title}
        </Card.Title>
        <Card.Text>{item.description}</Card.Text>
        {item?.tags?.map((tag, index) => (
          <Badge key={`tags ${index}`} bg="secondary" className="m-1">
            {tag}
          </Badge>
        ))}
      </Card.Body>
    </Card>
  )
}
