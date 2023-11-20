import Map from '@/components/Map'
import GoogleAutoComplete from '@/components/shared/GoogleAutoComplete'
import React from 'react'

export default function MapView() {
  return (
    <div>
      <GoogleAutoComplete />
      <Map />
    </div>
  )
}
