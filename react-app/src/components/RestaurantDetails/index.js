import './RestaurantDetails.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import ProductList from '../../Cards/product/ProductList'
// import products from '../../../seedData/products.json'

const RestaurantDetails = () => {
  const dispatch = useDispatch()
	const { restaurantId } = useParams()
	const [currRestaurant, setcurrRestaurant] = useState({ dne: true })
	const [focusTab, setFocusTab] = useState()
	const [currProducts, setCurrProducts] = useState([])
	const [sectionHeaders, setSectionHeaders] = useState([])

	useEffect(() => {
		window.scroll(0, 0)
		const restaurantItems = []
		setCurrProducts([])
		setcurrRestaurant({ dne: true })
		// for (const restaurant of restaurants) { // replace with findone, index restaurantId
		// 	if (restaurant.restaurantId === restaurantId) {
		// 		setcurrRestaurant(restaurant)
		// 		break
		// 	}
		// }
		// setSectionHeaders(() => {
		// 	const headers = []
		// 	if (restaurantProducts.length) headers.push(['MERCH', 'restaurant-page-merch'])
		// 	return [...headers, ['INTERACTIONS', 'restaurant-page-interactions'], ['ABOUT', 'restaurant-page-about']]
		// })
		setCurrProducts(restaurantItems)
	}, [restaurantId])

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
	if (currRestaurant.dne) return (
		<div className='unavailable'>
			<h1>Sorry, this page isn't available.</h1>
			<p>The link you followed may be broken, or the page may have been removed.</p>
		</div>
	)
	else return (
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
				<img className='restaurant-card-img page' src={currRestaurant.profileImage} alt={currRestaurant.name} />
				<div className="header-info">
								<h3 className='page-header-name'><b>{currRestaurant.displayName}</b></h3>
				</div>
			</div>
			<div id="restaurant-page-merch">
				{/* <ProductList products={currProducts} /> */}
			</div>
		</div>
	)
}

export default RestaurantDetails
