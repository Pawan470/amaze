'use client'
import { useDebounce } from '@/hooks/useDebounce'
import { getRequest } from '@/utils/axiosMethod'
import { handleError } from '@/utils/utils'
import React, { useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Spinner from 'react-bootstrap/Spinner'
import Error from '@/components/shared/Error/Error'

export const metadata = {
  title: '...kkkkkk',
}

export default function Page() {
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

  console.log(error)

  return (
    <div className="container">
      <h1>Page :- {debouncedValue}</h1>
      <input type="text" value={searchText} onChange={handleSearchText} />

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
