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
      {isLoaded ? <div className="restaurant-list">
        {restaurants ? restaurants.map((restaurant) => (
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
        )) : <h2 className='no-match'>
          No restaurants matched your search.
        </h2>}
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
