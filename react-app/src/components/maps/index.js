import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKey } from '../../store/maps';
import Maps from './Maps';
import './mapContainer.css'

const MapContainerModal = ({ restaurant }) => {
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!key) {
      dispatch(getKey())
      .then(setIsLoaded(true))
    }
    else setIsLoaded(true)
  }, [dispatch, key]);

  if (!key) {
    return (<div>HELLO</div>)
  }

  const center = {
    lat: restaurant?.lat,
    lng: restaurant?.lng
  }

  return (
    <> {isLoaded &&
    <div className='map-page'>
      <div className='map-container'>
          <Maps apiKey={key} center={center} />
      </div>
      <div className='map-page-desc'>
        <h1 className='map-page-header'>{restaurant?.name}</h1>
        <p className='map-page-details'>{restaurant?.type}</p>
        <p className='map-loc'>{restaurant?.address}, {restaurant?.city}, {restaurant?.state}</p>
      </div>
    </div>}
    </>
  );
};

export default MapContainerModal;
