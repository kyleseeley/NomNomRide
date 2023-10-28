import './ItemList.css'
import ItemCard from './ItemCard'

const ItemList = ({ category, items, skeleton }) => {

  if (!skeleton) return (
    <>
      <h2 id={category}>{category}</h2>
      <ul className='cat-item-list'>
        {items.map(item => (
          <li className='item-li' key={item.id}>
            <ItemCard item={item} />
          </li>
        ))}
      </ul>
    </>
  )

  else return (
    <>
      <h2 className='cat-header skeleton'/>
      <ul className='cat-item-list'>
        {Array.from({length: 4}, (_, i) => i + 1).map(i => (
          <li className='item-li' key={i}>
            <ItemCard skeleton={true} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ItemList
