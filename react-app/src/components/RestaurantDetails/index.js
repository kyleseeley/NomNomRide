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
	console.log(restaurantItems)
	const { restaurantId } = useParams()
	const [focusTab, setFocusTab] = useState()
	const [currProducts, setCurrProducts] = useState([])
	const [sectionHeaders, setSectionHeaders] = useState([])
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		window.scroll(0, 0)
		dispatch(fetchOneRestaurant(restaurantId))
		.then(dispatch(fetchMenuItemsThunk(restaurantId)))
		.then(setIsLoaded(true))
		// setSectionHeaders(() => {
		// 	const headers = []
		// 	if (restaurantProducts.length) headers.push(['MERCH', 'restaurant-page-merch'])
		// 	return [...headers, ['INTERACTIONS', 'restaurant-page-interactions'], ['ABOUT', 'restaurant-page-about']]
		// })
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
		<div className="restaurant-page">
			<div className='restaurant-page-section-header-div'>
							{/* ${scrollTop ? 'visible' : ''} */}
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
			</div>
			<div
				style={{
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
				className="restaurant-page-header"
			>
				{/* <img className='restaurant-card-img page' src={restaurant.profileImage} alt={restaurant.name} /> */}
				<div className="header-info">
								{/* <h3 className='page-header-name'><b>{restaurant.displayName}</b></h3> */}
				</div>
			</div>
			<div id="restaurant-page-merch">
				{/* <ProductList products={currProducts} /> */}
			</div>
		</div>
	)
}

export default RestaurantDetails
