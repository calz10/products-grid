import React, { useState, useEffect } from 'react'
import { Content } from '../Content'
import { ProductCard } from '../Card'
import './index.less'

const colors = ['d1eeeb', 'fbe8e4', 'ecf4e0', 'faeefa', 'eee9e8', 'e6eafd']

const ProductList = ({ products = [] }) => {
  return (
    <Content className="list">
      {products.map((item, i) => {
        const randomizedNumber = Math.floor((Math.random() * 7))
        const currentIndex = i + 1
        const isAdsIndex = currentIndex % 20 === 1 

        return (
          <ProductCard
            key={item.id}
            randomizedNumber={isAdsIndex? ((randomizedNumber+1) + (Math.round((currentIndex-1)/20))): 0}
            isAds={(isAdsIndex && currentIndex > 20)}
            bgColor={colors[randomizedNumber]}
            product={item}
          />
        )
      })}
    </Content>
  )
}

export default ProductList