'use client'

import Header from '@/components/shared/Header'
import { Toaster } from 'react-hot-toast'
import { Fragment } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import Loader from './Loader'
import useAuth from '@/hooks/useAuth'

const MainLayout = ({ children }) => {
  return (
    <Provider store={store}>
      <App>{children}</App>
    </Provider>
  )
}

export default MainLayout

const App = ({ children }) => {
  const data = useAuth()

  if (data?.isLoading) return <Loader />
  if (data?.isError) return <p>Some thing went wrong</p>

  return (
    <Fragment>
      <Header profile={data?.data} />
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </Fragment>
  )
}