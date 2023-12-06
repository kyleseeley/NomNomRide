import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};


const Maps = ({ apiKey, center }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });


  if (isLoaded) return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}>
        <Marker position={center}/>
      </GoogleMap>
    </>
  );
  else return (
    <>
    </>
  )
};

export default React.memo(Maps);
