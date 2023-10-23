import './CartItemCard.css'

const CartItemCard = ({ item, isLoaded }) => {
    if (isLoaded) return (
      <div>
        {item.name}

      </div>
  )
  else return (
    <>
    </>
  )
}

export default CartItemCard
