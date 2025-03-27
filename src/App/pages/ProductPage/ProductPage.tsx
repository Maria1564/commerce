import React from 'react'
import { Link } from 'react-router'
import Text from 'components/Text'
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon'
import { Routes } from 'types/index'
import Info from './components/Info/Info'
import RelatedProducts from './components/RelatedProducts'
import style from "./ProductPage.module.scss"


const ProductPage: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <Link to={Routes.catalog} replace className={style.link_back}>
        <ArrowLeftIcon/>
        <Text view='p-20'>back</Text>
      </Link>
      <Info/>
      <RelatedProducts/>
    </div>
  )
}

export default ProductPage