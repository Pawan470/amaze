'use client'
import React, { Fragment, memo } from 'react'
import Link from 'next/link'
import { AUTH_ROUTES, ROUTES } from '@/constants/routes'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { KEYS, SYSTEM_ROLES } from '@/constants'
import Cookies from 'js-cookie'
import useToSignOut from '@/hooks/useToSignOut'

const navPath = [
  { name: 'Home', path: ROUTES.HOME },
  { name: 'Practice', path: ROUTES.PRACTICE },
  { name: 'Login', path: AUTH_ROUTES.LOGIN },
  { name: 'Sign up', path: AUTH_ROUTES.SIGNUP },
]

const ownerPath = [
  { name: 'Home', path: ROUTES.OFFICES },
  { name: 'Events', path: ROUTES.EVENTS },
  { name: 'Staff', path: ROUTES.STAFF },
  { name: 'Subscription', path: ROUTES.SUBSCRIPTION },
]

const staffPath = [
  { name: 'Home', path: ROUTES.OFFICES },
  { name: 'Events', path: ROUTES.EVENTS },
  { name: 'Staff', path: ROUTES.STAFF },
]

function Header({ profile }) {
  const { signOut } = useToSignOut()

  if (profile?.role === SYSTEM_ROLES.OWNER) {
    return (
      <Navbar bg="dark" data-bs-theme="dark" className="mb-2">
        <Container>
          <Nav className="me-auto">
            {ownerPath.map((item, index) => (
              <Fragment key={index}>
                <Link href={item.path} className="nav-link">
                  {item.name}
                </Link>
              </Fragment>
            ))}
            <button onClick={signOut}>Logout</button>
          </Nav>
        </Container>
      </Navbar>
    )
  }

  if (profile?.role === SYSTEM_ROLES.STAFF) {
    return (
      <Navbar bg="dark" data-bs-theme="dark" className="mb-2">
        <Container>
          <Nav className="me-auto">
            {staffPath.map((item, index) => (
              <Fragment key={index}>
                <Link href={item.path} className="nav-link">
                  {item.name}
                </Link>
              </Fragment>
            ))}
            <button onClick={signOut}>Logout</button>
          </Nav>
        </Container>
      </Navbar>
    )
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="mb-2">
      <Container>
        <Nav className="me-auto">
          {navPath.map((item, index) => (
            <Fragment key={index}>
              <Link href={item.path} className="nav-link">
                {item.name}
              </Link>
            </Fragment>
          ))}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default memo(Header)
