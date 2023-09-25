import React, { useRef, useEffect, useState } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import { config } from '@/config/config'

function Map({ google }) {
  const ref = useRef()
  const [Map, setMap] = useState(null)
  const [Markers, setMarker] = useState([])

  useEffect(() => {
    if (!Map) {
      let initMap = mapInit()
      setMap(initMap)
      initMap.addListener('click', handleClickMap)
    }
  })

  const mapInit = () => {
    return new window.google.maps.Map(ref.current, {
      center: { lat: 57.89, lng: -101.61 },
      zoom: 4,
    })
  }

  const handleClickMap = (mapsMouseEvent) => {
    setMarker((prev) => [...prev, { position: { ...mapsMouseEvent.latLng } }])
  }

  const handleMarker = (marker, index) => {
    marker.setMap(null)
    setMarker((prev) => prev.filter((item, i) => i !== index))
  }

  return (
    <div className="container">
      <div ref={ref} id="map" style={{ width: '100%', height: '500px' }} />
      {Boolean(Markers?.length) &&
        Markers.map((item, index) => (
          <Marker
            key={index}
            position={{ lat: item.position.lat(), lng: item.position.lng() }}
            Map={Map}
            onClick={(e) => handleMarker(e, index)}
          />
        ))}
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: config.googleKey,
  libraries: ['places'],
})(Map)

function Marker({ position, Map, onClick }) {
  useEffect(() => {
    let marker = new google.maps.Marker({
      position,
      title: `Hello World! ${Math.random()}`,
    })
    marker.setMap(Map)
    marker.addListener('click', () => {
      onClick && onClick(marker)
    })
  }, [])
}
