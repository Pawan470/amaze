import { Fragment } from 'react'

export default function Select() {
  return (
    <Fragment>
      <select class="form-select">
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </Fragment>
  )
}
