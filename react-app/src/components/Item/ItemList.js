import './ItemList.css'
import { useState, useEffect } from 'react'
import ItemCard from './ItemCard'

const ItemList = ({ category, items }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    if (items) setIsLoaded(true)
  }, [items])

  return (
    <>
      <h2 id={category}>{category}</h2>
      <ul className='cat-item-list'>
        {items.map(item => (
          <li className='item-li' key={item.id}>
            <ItemCard item={item} isLoaded={isLoaded} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ItemList
