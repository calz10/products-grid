import React from 'react'
import { Content } from '../Content'
import './index.less'

const Product = props => {
  const { isAds = false, randomizedNumber, bgColor, product: item } = props

  return (
    <Content className="product-card">
      <Content className="product-details">
        <Content className="product-detail">
          <Content className="product-price">
            {isAds ? `Paid Advertisement` : `Price: ${(item.price/100).toFixed(2)} USD`}
          </Content>
          {!isAds ?
            <Content className="product-size">
              Size: {item.size}
            </Content> : null
          }
        </Content>
        {!isAds && <Content className="product-detail">
          <Content className="product-id">
            {item.id}
          </Content>
          <Content className="product-added">
            {new Date(item.date).toLocaleString()}
          </Content>
        </Content>
        }
      </Content>
      <Content className="product-image">
        <Content className="image-detail" style={isAds ? { backgroundImage: `url('http://localhost:3000/ads?r=${randomizedNumber})` } : { backgroundColor: bgColor, fontSize: item.size }}>
          {item.face}
        </Content>
      </Content>
    </Content>
  )
}

export default Product