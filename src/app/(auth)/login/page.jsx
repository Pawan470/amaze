'use client'
import React from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import useAuth from '../_Hooks/useAuth'
import Loader from '@/components/shared/Loader'
import { withRoleProtection } from '@/Hoc/withRoleProtection'
import SubmitBtn from '@/components/shared/SubmitBtn'

function Login() {
  const { values, methods, isLoading, error } = useAuth()

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={values.email}
            onChange={methods.onChange}
            placeholder="Enter email"
          />
        </Form.Group>
        {error.email && <span className="text-danger">{error.email}</span>}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            autoComplete={'false'}
            value={values.password}
            placeholder="Password"
            onChange={methods.onChange}
          />
        </Form.Group>
        {error.password && <div className="text-danger">{error.password}</div>}
        <SubmitBtn isLoading={isLoading} handleSubmit={methods.handleSubmit}>
          Submit
        </SubmitBtn>
      </Form>
    </Container>
  )
}

export default withRoleProtection(Login, [])
