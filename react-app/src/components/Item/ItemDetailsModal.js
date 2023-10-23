import './ItemDetailsModal.css'
import { useModal } from '../../context/Modal';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartThunk, postCartThunk } from '../../store/cart';
import { postCartItemThunk } from '../../store/cartItems';

const ItemDetailsModal = ({ item }) => {
	const dispatch = useDispatch()
	const [quantity, setQuantity] = useState(1)
	const { closeModal } = useModal()
	const user = useSelector(state => state.session.user)
	const cart = useSelector(state => state.cart.cart)


	const addToCart = () => {
		if (!cart?.id) dispatch(postCartThunk(item.restaurantId))
		dispatch(postCartItemThunk(item.id, quantity))
		.then(() => dispatch(getCartThunk()))

		closeModal()
	}

	return (
		<div className='item-modal'>
			<i
				onClick={closeModal}
				className="fa-solid fa-x modal" />
			<div className='item-img-container'>
				<img
					className='item-modal-img'
					src={item.image}
					alt={item.name} />
			</div>
			<div className='item-modal-details'>
				<h1 className='item-modal-name'>
					{item.name}
				</h1>
				<p className='item-modal-price'>
					${item.price}
				</p>
        {user ? <>
					<div className='item-modal-quantity'>
						<div className='item-modal-quantity-label'>Quantity</div>
						<select
							onChange={e => setQuantity(e.target.value)}
							className='item-modal-quantity-select'
							value={quantity}>
							{Array.from(Array(99).keys()).map(el =>
								<option
									value={el + 1}
									key={el + 1}>
									{el + 1}
								</option>
							)}
						</select>
					</div>
					<div>
						<button
							className='item-modal-add-cart'
							onClick={addToCart}>
							Add to Cart
						</button>
					</div>
				</> : <>
					<div>Log in to add this item to your cart.</div>
				</>}

			</div>
		</div>
	)
}

export default ItemDetailsModal;
