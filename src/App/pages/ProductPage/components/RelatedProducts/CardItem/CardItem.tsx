import React from 'react'
import Button from 'components/Button'
import Card from 'components/Card'
import { Product } from 'types/index'

type CardItemProps = {
    item: Product
}

const CardItem: React.FC<CardItemProps> = ({item}) => {
  return (
    <Card
    image={item.urlImage}
    captionSlot={item.category}
    title={item.title}
    subtitle={item.description}
    contentSlot={`$${item.price}`}
    actionSlot={<Button>Add to Cart</Button>}
    onClick={()=>{}}
  /> 
  )
}

export default CardItem