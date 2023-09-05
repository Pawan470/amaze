import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export default function Loader() {
  return (
    <div className="cus_loader">
      <Spinner animation="grow" size="lg" variant="light" />
    </div>
  )
}