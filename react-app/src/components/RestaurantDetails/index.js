import './RestaurantDetails.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOneRestaurant } from '../../store/restaurant'
import { fetchMenuItemsThunk } from '../../store/menuItems'

const RestaurantDetails = () => {
	const dispatch = useDispatch()
	const { restaurantId } = useParams()
	const restaurant = useSelector(state => state.restaurant[restaurantId])
	const restaurantItems = useSelector(state => state.menuItems)
	const categories = {}
	for (const item of Object.values(restaurantItems)) {
		if (!categories[item.type]) categories[item.type] = [item]
		else categories[item.type] = [...categories[item.type], item]
	}

	const [focusTab, setFocusTab] = useState()
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		window.scroll(0, 0)
		dispatch(fetchOneRestaurant(restaurantId))
		.then(dispatch(fetchMenuItemsThunk(restaurantId)))
		.then()
		.then(setIsLoaded(true))
	}, [dispatch, restaurantId])

	const scrollToId = (catName) => {
		const element = catName ? document.getElementById(catName) : catName
		const elementPosition = element.getBoundingClientRect().top + window.scrollY - 60
		window.scrollTo({
			top: elementPosition,
			behavior: "smooth"
		})
		setFocusTab(catName)
	}

	// if link name is invalid, catch all
	// if (restaurant.dne) return (
	// 	<div className='unavailable'>
	// 		<h1>Sorry, this page isn't available.</h1>
	// 		<p>The link you followed may be broken, or the page may have been removed.</p>
	// 	</div>
	// )
	return (
		<div className="restaurant-page page-container">
			<div
				style={{
					backgroundImage: `url(${restaurant?.image})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
				className="restaurant-banner"/>
			<div className="header">
				<h1 className='restaurant-name'>{restaurant?.name} ({restaurant?.address})</h1>
				<p className='restaurant-details'>
					<i className="fa-solid fa-star" />
					&nbsp; <b>{restaurant?.starRating} ({restaurant?.numReviews} ratings)</b>
				</p>
			</div>
			<div className='menu-section'>
				<div className='restaurant-page-cat-div'>
					{Object.keys(categories).map(category => {
						return (
							<span
								key={category}
								className={`restaurant-page-cat
									${focusTab === category ? 'focus' : ''}`}
								onClick={() => scrollToId(category)}>
								{category}
							</span>
						)
					})}
				</div>
				<div className='cat-section'>
				{Object.keys(categories).map(category => {
						return (
							<span
								key={category}
								id={category}>
								<h2>{category}</h2>
								<div className='cat-item-list'>
									{Object.values(categories[category]).map(item => {
										return (
											<div
												key={item?.id}
												className='item-card'>
												<img className='item-card-img' src={item?.image} alt={item?.image}/>
												<p className='item-card-name'><b>{item?.name}</b></p>
												<p className='item-card-price'>${item?.price}</p>
												{/* <p>{item?.description}</p> */}
											</div>
										)
									})}
								</div>
							</span>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default RestaurantDetails
