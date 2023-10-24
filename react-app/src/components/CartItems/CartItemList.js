import './CartItemList.css'
import { useState, useEffect } from 'react'
import CartItemCard from './CartItemCard'

const CartItemList = ({ items }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    if (items) setIsLoaded(true)
  }, [items])

  return (
    <>
      <div className='cart-item-list'>
        {items.map(item => (
            <CartItemCard
              key={item.id}
              item={item}
              isLoaded={isLoaded} />
        ))}
      </div>
    </>
  )
}

export default CartItemList
