import './ItemCard.css'
import OpenModalButton from '../OpenModalButton'
import ItemDetailsModal from './ItemDetailsModal'
import { useEffect, useState } from 'react'

const ItemCard = ({ item, skeleton }) => {
  const [workingUrl, setWorkingUrl] = useState(false)
  const [src, setSrc] = useState(item?.image)

  useEffect(() => {
    if (item?.image) setWorkingUrl(true)
  })

    if (!skeleton) return (
      <OpenModalButton
      modalComponent={() => <ItemDetailsModal item={item} workingUrl={workingUrl} src={src} />}
      className={`item-card ${workingUrl ? '' : 'no-img'}`}
      buttonText={
        <>
          {workingUrl && <img
            src={src}
            onError={() => setSrc('https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg')}
            className='item-card-img'/>}
          <p className='item-card-name'>{item.name}</p>
          <p className='item-card-price'>${item.price}</p>
        </>
      }/>
  )
  else return (
    <div className='item-card'>
      <img className='item-card-img skeleton'/>
      <p className='item-card-name skeleton' />
      <p className='item-card-price skeleton' />
    </div>
  )
}

export default ItemCard
