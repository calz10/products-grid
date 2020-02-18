import React, { useState, useEffect } from 'react'
import { Content } from '../Content'
import { ProductCard } from '../Card'
import './index.less'

const colors = ['d1eeeb', 'fbe8e4', 'ecf4e0', 'faeefa', 'eee9e8', 'e6eafd']
const { Fragment } = React

const ProductList = ({ products = [] }) => {
  return (
    <Content className="list">
      {products.map((item, i) => {
        const randomizedNumber = Math.floor((Math.random() * 7))
        const currentIndex = i + 1
        const isAdsIndex = currentIndex % 20 === 1

        if (isAdsIndex && currentIndex > 20) {
          return (
            <Fragment
              key={item.id}
            >
              <ProductCard
                key={item.id + i}
                randomizedNumber={(Math.floor((Math.random() * 100)) + 1) + (Math.round((currentIndex - 1) / 20))}
                isAds={(isAdsIndex && currentIndex > 20)}
              />
              <ProductCard
                key={item.id}
                bgColor={colors[randomizedNumber]}
                product={item}
              />
            </Fragment>
          )
        }

        return (
          <ProductCard
            key={item.id}
            bgColor={colors[randomizedNumber]}
            product={item}
          />
        )
      })}
    </Content>
  )
}

export default ProductList