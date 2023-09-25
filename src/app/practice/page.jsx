'use client'
import { useDebounce } from '@/hooks/useDebounce'
import { getRequest } from '@/utils/axiosMethod'
import { handleError } from '@/utils/utils'
import React, { useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Spinner from 'react-bootstrap/Spinner'
import Error from '@/components/shared/Error/Error'
import GoogleAutoComplete from '@/components/shared/GoogleAutoComplete'

export const metadata = {
  title: '...kkkkkk',
}

export default function Page(props) {
  console.log(props)
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, seterror] = useState(null)

  const debouncedValue = useDebounce(searchText)
  const [key, setKey] = useState('Products')
  const [data, setData] = useState([])

  useEffect(() => {
    setData([])
    if (key === 'Products') getProducts()
    if (key === 'users') getUsers()
  }, [key])

  const handleSearchText = (event) => {
    setSearchText(event.target.value)
  }

  const getProducts = async () => {
    try {
      setIsLoading(true)
      let response = await getRequest('https://dummyjson.com/products')
      setData(response.products)
    } catch (error) {
      handleError(error)
    }
    setIsLoading(false)
  }

  const getUsers = async () => {
    try {
      setIsLoading(true)
      let response = await getRequest('https://dummyjson.com/users')
      setData(response.users)
    } catch (error) {
      handleError(error)
      seterror(error)
    }
    setIsLoading(false)
  }

  return (
    <div className="container">
      <h1>Page :- {debouncedValue}</h1>
      <input type="text" value={searchText} onChange={handleSearchText} />
      <GoogleAutoComplete />

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 mt-3"
      >
        <Tab eventKey="Products" title="Products">
          <ProductListing products={data} isLoading={isLoading} />
        </Tab>
        <Tab eventKey="users" title="Users">
          {error ? <Error error={error} /> : <UsersListing users={data} isLoading={isLoading} />}
        </Tab>
      </Tabs>

      <PaginationApp
        currentPage={1}
        totalPages={10}
        onPageChange={(e) => {
          console.log(e)
        }}
      />
    </div>
  )
}

const LoaderCustom = () => {
  return (
    <div className="text-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

const ProductListing = ({ products, isLoading }) => {
  if (isLoading) return <LoaderCustom />
  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}

const UsersListing = ({ users, isLoading }) => {
  if (isLoading) return <LoaderCustom />
  return (
    <ul>
      {users.map((item) => (
        <li key={item.id}>
          {item.firstName} - {item.lastName}
        </li>
      ))}
    </ul>
  )
}

const PaginationApp = ({ currentPage, totalPages, onPageChange }) => {
  const [page, setPage] = useState(currentPage)
  const maxButtonsToShow = 5 // Maximum number of page buttons to display
  const halfMaxButtons = Math.floor(maxButtonsToShow / 2)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
      onPageChange(newPage)
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    let startPage = 1
    let endPage = totalPages

    if (totalPages > maxButtonsToShow) {
      if (page <= halfMaxButtons) {
        endPage = maxButtonsToShow
      } else if (page >= totalPages - halfMaxButtons) {
        startPage = totalPages - maxButtonsToShow + 1
      } else {
        startPage = page - halfMaxButtons
        endPage = page + halfMaxButtons
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${page === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          <a className="page-link" href="#">
            {i}
          </a>
        </li>,
      )
    }

    if (totalPages > maxButtonsToShow) {
      if (startPage > 1) {
        pageNumbers.unshift(
          <li className="page-item disabled" key="start-ellipsis">
            <span className="page-link">...</span>
          </li>,
        )
      }

      if (endPage < totalPages) {
        pageNumbers.push(
          <li className="page-item disabled" key="end-ellipsis">
            <span className="page-link">...</span>
          </li>,
        )
      }
    }

    return pageNumbers
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">{renderPageNumbers()}</ul>
    </nav>
  )
}
