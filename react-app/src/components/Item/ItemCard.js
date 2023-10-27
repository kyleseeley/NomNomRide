import './ItemCard.css'
import OpenModalButton from '../OpenModalButton'
import ItemDetailsModal from './ItemDetailsModal'
import { useEffect, useState } from 'react'

const ItemCard = ({ item, isLoaded }) => {
  const [workingUrl, setWorkingUrl] = useState(false)

  useEffect(() => {
    try {
      fetch(item.image)
      .then(response => {
        if (response.status === 200) setWorkingUrl(true)
      })
    } catch {}
  })

    if (isLoaded) return (
      <OpenModalButton
      modalComponent={() => <ItemDetailsModal item={item} workingUrl={workingUrl} />}
      className={`item-card ${workingUrl ? '' : 'no-img'}`}
      buttonText={
        <>
          {workingUrl && <img
            src={item.image}
            className='item-card-img'/>}
          <p className='item-card-name'>{item.name}</p>
          <p className='item-card-price'>${item.price}</p>
        </>
      }/>
  )
  else return (
    <>
    </>
  )
}

export default ItemCard
