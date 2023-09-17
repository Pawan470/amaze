'use client'
import React from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import useAuth from '../_Hooks/useAuth'
import Loader from '@/components/shared/Loader'
import { withRoleProtection } from '@/Hoc/withRoleProtection'
import useToSignOut from '@/hooks/useToSignOut'

function Login() {
  const { values, methods, isLoading } = useAuth()
  const { signOut } = useToSignOut()

  if (isLoading) return <Loader />
  return (
    <Container>
      <button onClick={signOut}>logout</button>
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
