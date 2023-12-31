import './CartItemCard.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteCartItemThunk, updateCartItemThunk } from '../../store/cartItems'
import { getCartThunk } from '../../store/cart'

const CartItemCard = ({ item, numItems, setNumItems, setRefresh, carts, setCart, setNumCarts }) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(item.quantity)
  const [remove, setRemove] = useState(false)

  const updateCartItem = newQuantity => {
    if (newQuantity == 'remove') {
      dispatch(deleteCartItemThunk(item.id))
      .then(() => dispatch(getCartThunk()))
      setRemove(true)
      setNumItems(prev => prev - 1)
      if (numItems === 1) {
        setCart(Object.values(carts)[0])
        setNumCarts(prev => prev - 1)
      }
    }
    else {
      setQuantity(newQuantity)
      dispatch(updateCartItemThunk(item.id, newQuantity))
      .then(() => dispatch(getCartThunk()).then(() => {
        setRefresh(prev => !prev)
        setRefresh(true)
      }))
    }
  }

  if (!remove) return (
    <div className='cart-item-card'>
      <div className='cart-item-quantity'>
        <select
          onChange={e => updateCartItem(e.target.value)}
          className='cart-item-quantity-select'
          value={quantity}>
          <option value='remove'>Remove</option>
          {Array.from(Array(99).keys()).map(el =>
            <option
              value={el + 1}
              key={el + 1}>
              {el + 1}
            </option>
          )}
        </select>
      </div>
      <div className='cart-item-details-div'>
        <div className='cart-item-name'>
          {item.name}
        </div>
      </div>
      <div className='cart-item-price'>
        {`$${parseFloat(item.price * quantity).toFixed(2)}`}
      </div>

    </div>
  )
  else return (
    <>
    </>
  )
}

export default CartItemCard
