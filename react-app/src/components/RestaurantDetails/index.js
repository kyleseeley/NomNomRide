import './RestaurantDetails.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOneRestaurant } from '../../store/restaurant'
import { fetchMenuItemsThunk } from '../../store/menuItems'

const RestaurantDetails = () => {
  const dispatch = useDispatch()
	const restaurant = useSelector(state => state.restaurant.restaurant)
	const restaurantItems = useSelector(state => state.menuItems)
	console.log(restaurant)
	console.log(restaurantItems)
	const categories = {}
	for (const item in restaurantItems) {
		if (!categories[item.type]) categories[item.type] = item.type
	}
	const { restaurantId } = useParams()
	const [focusTab, setFocusTab] = useState()
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		window.scroll(0, 0)
		dispatch(fetchOneRestaurant(restaurantId))
		.then(dispatch(fetchMenuItemsThunk(restaurantId)))
		.then()
		.then(setIsLoaded(true))
	}, [dispatch, restaurantId])

	const scrollToId = (id, tabName) => {
		const element = id ? document.getElementById(id) : id
		const elementPosition = element.getBoundingClientRect().top + window.scrollY + 40
		window.scrollTo({
			top: elementPosition,
			behavior: "smooth"
		})
		setFocusTab(tabName)
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
			{/* <div className='restaurant-page-section-header-div'>
				{sectionHeaders.map(header => {
					return (
						<span
							key={header[0]}
							className={`restaurant-page-section-header
								${focusTab === header[0] ? 'focus' : ''}`}
							onClick={() => scrollToId(header[1], header[0])}>
							{header[0]}
						</span>
					)
				})}
			</div> */}
			<div
				style={{
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${restaurant?.image})`,
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

			</div>
		</div>
	)
}

export default RestaurantDetails
