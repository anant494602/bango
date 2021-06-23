import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const GoogleMapComponent =()=>{
    return (
        <div>
        <GooglePlacesAutocomplete
          apiKey="AIzaSyD5axnFxMQ4uXTmhUvgrNBjUjC2kXGc93Q"
        />
      </div>
    )
}

export default React.memo(GoogleMapComponent)