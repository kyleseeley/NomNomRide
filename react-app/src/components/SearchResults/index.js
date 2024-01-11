import { useSelector, useDispatch} from 'react-redux'
import './SearchResults.css'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { searchRestaurantsThunk } from '../../store/restaurant'

const SearchResults = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const restaurants = Object.values(useSelector(state => state.restaurant)) || []
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(searchRestaurantsThunk(location.search.slice(7)))
    .then(setIsLoaded(true))
  }, [dispatch, location])
  return (
    <div className='search-results-page page-container'>
      {isLoaded ? <div>
        {restaurants.length ? <div className='restaurant-list'> {restaurants.map((restaurant) => (
          <NavLink
            to={`/${restaurant.id}`}
            key={restaurant.id} className="restaurant-card">
            <div className="restaurant-image">
              <img src={restaurant.image} alt="Preview" />
            </div>
            <div className="restaurant-info">
              <p className="restaurant-name">
                {restaurant.name} ({restaurant.address})
              </p>
              <p className="restaurant-rating">{restaurant.starRating}</p>
            </div>
          </NavLink>
        ))} </div> : <div className='no-match'>
          <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/f601b8be1064c30a.svg"/>
          <h1>We didn't find a restaurant with that name.</h1>
          <div>Try searching for something else instead.</div>
          <NavLink
            to='/'
            className='return-home-from-search'>
            View all
          </NavLink>
        </div>}
      </div> : <div>
      <div className="restaurant-list">
        {Array.from({length: 16}, (_, i) => i + 1).map(i => (
          <div key={i} className="restaurant-card">
            <div className="restaurant-image skeleton" />
            <div className="restaurant-info">
              <p className="restaurant-name skeleton" />
              <p className="restaurant-rating skeleton" />
            </div>
          </div>
        ))}
      </div>
      </div>}
    </div>
  )
}

export default SearchResults
