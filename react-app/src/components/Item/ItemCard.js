import './ItemCard.css'
import OpenModalButton from '../OpenModalButton'
import ItemDetailsModal from './ItemDetailsModal'

const ItemCard = ({ item, isLoaded }) => {
    if (isLoaded) return (
      <OpenModalButton
      modalComponent={() => <ItemDetailsModal item={item} />}
      className='item-card button'
      buttonText={
        <div className="item-card">
          <img
            src={item.image}
            alt={item.name}
            className='item-card-img'/>
          <p className='item-card-name'>{item.name}</p>
          <p className='item-card-price'>${item.price}</p>
        </div>
      }/>
  )
  else return (
    <>
    </>
  )
}

export default ItemCard
