import React from 'react'
import { Spinner } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export default function SubmitBtn({ children, handleSubmit, isLoading = false }) {
  if (isLoading)
    return (
      <Button variant="primary" type="button" disabled>
        Loading... <Spinner animation="border" size="sm" />
      </Button>
    )

  return (
    <Button variant="primary" type="button" onClick={handleSubmit}>
      {children}
    </Button>
  )
}
