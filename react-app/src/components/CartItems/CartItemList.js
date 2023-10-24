import './CartItemList.css'
import { useState, useEffect } from 'react'
import CartItemCard from './CartItemCard'

const CartItemList = ({ cart, numItems, setNumItems }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (cart.items) setIsLoaded(true)
  }, [cart.items])

  return (
    <>
      <div className='cart-item-list'>
        <div className='top-subtotal'>
          <span className='cart-num-items'>
            {`${numItems} item${numItems > 1 ? 's' : ''}`}
          </span>
          <span>Subtotal: ${cart.cart.total}</span>
        </div>
        {cart.items.map(item => (
            <CartItemCard
              setNumItems={setNumItems}
              key={item.id}
              item={item}
              isLoaded={isLoaded} />
        ))}
        <div className='bottom-subtotal'>
          <span>Subtotal</span>
          <span>${cart.cart.total}</span>
        </div>
      </div>
    </>
  )
}

export default CartItemList
