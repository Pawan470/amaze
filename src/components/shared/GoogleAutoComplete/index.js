import React, { useCallback, useState } from 'react'
import { debounce, handleError } from '@/utils/utils'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { GoogleApiWrapper } from 'google-maps-react'
import { config } from '@/config/config'

function GoogleAutoComplete({ value, setValue, lable, getSelectionDetails, google }) {
  const [predictions, setPredictions] = useState([])

  const handleChange = useCallback(
    debounce((event) => {
      try {
        const inputValue = event.target.value
        if (google?.maps?.places && inputValue?.trim()?.length) {
          new google.maps.places.AutocompleteService().getPlacePredictions(
            { input: inputValue },
            (places, status) => {
              setPredictions(status === 'OK' ? places : [])
            },
          )
        } else {
          setPredictions([])
        }
      } catch (error) {
        handleError(error)
      }
    }, 1500),
    [],
  )

  const handleSelection = (item) => {
    setValue(item.description)
    setPredictions([])
    getSelectionDetails && getSelectionDetails(item)
  }

  return (
    <div>
      <Form.Label htmlFor="basic-url">{lable || 'Google Auto Complete'} </Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          onChange={(e) => {
            handleChange(e)
            setValue && setValue(e.target.value)
          }}
          value={value}
          id="basic-url"
          aria-describedby="basic-addon3"
          autoComplete="off"
        />
      </InputGroup>

      <ListGroup>
        {predictions?.length > 0 &&
          predictions.map((item, index) => (
            <ListGroup.Item
              style={{ cursor: 'pointer' }}
              onClick={() => handleSelection(item)}
              key={item.place_id || index}
            >
              {item?.description}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: config.googleKey,
  libraries: ['places'],
})(GoogleAutoComplete)
