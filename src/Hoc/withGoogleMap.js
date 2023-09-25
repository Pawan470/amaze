import React, { Fragment } from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { config } from '@/config/config'

const render = (status) => {
  return <p>{status}</p>
}

export default function withGoogleMap(MyComponent) {
  const ComponentWithGoogleObject = (props) => {
    return (
      <Fragment>
        <h2>okok</h2>
        <Wrapper apiKey={config.googleKey} render={render}>
          <MyComponent {...props} />
        </Wrapper>
      </Fragment>
    )
  }

  return ComponentWithGoogleObject
}
