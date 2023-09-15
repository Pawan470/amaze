'use client'
import React from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import useAuth from './useAuth'
import Loader from '@/components/shared/Loader'
import { withRoleProtection } from '@/Hoc/withRoleProtection'
import { KEYS } from '@/constants'

function Login() {
  const { values, methods, isLoading } = useAuth()
  return (
    <Container>
      {isLoading && <Loader />}
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
        <Button variant="primary" type="button" onClick={methods.handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default withRoleProtection(Login, [])
