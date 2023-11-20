'use client'

import Header from '@/components/shared/Header'
import { Toaster } from 'react-hot-toast'
import { Fragment, Suspense } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import Loader from '../components/shared/Loader'
import useAuth from '@/hooks/useAuth'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Container } from 'react-bootstrap'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

const MainLayout = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App>{children}</App>
      </Provider>
    </QueryClientProvider>
  )
}

export default MainLayout

const App = ({ children }) => {
  const data = useAuth()

  if (data?.isLoading) return <Loader />

  // if (data?.isError) return <p>Some thing went wrong (App_)</p>

  return (
    <Fragment>
      <Header profile={data?.data} />
      <Container>
        <Suspense fallback={<CusLoader />}>{children}</Suspense>
      </Container>
      <Toaster position="top-center" reverseOrder={false} />
    </Fragment>
  )
}

const CusLoader = () => {
  return <p>Loading 123.......</p>
}
