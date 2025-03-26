import React from 'react'
import Text from 'components/Text'
import Filter from './components/Filter'
import style from "./CatalogPage.module.scss"

const CatalogPage: React.FC = () => {
  return (
    <div className={style.wrapper}>
        <div className={style.about}>
          <Text view='title' weight='bold'>Products</Text>
          <Text view='p-20' color='secondary' className={style.text}> We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item</Text>
        </div>
        <Filter/>
    </div>
  )
}

export default CatalogPage