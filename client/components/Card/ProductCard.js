import React from 'react'
import { Content } from '../Content'
import './index.less'
import formatter from '../../utils'

const Product = props => {
  const { isAds = false, randomizedNumber, bgColor, product: item } = props

  const adsStyle = { backgroundImage: `url('http://localhost:3000/ads?r=${randomizedNumber})`}
  const contentStyle = isAds ? adsStyle: { backgroundColor: bgColor, fontSize: item.size }

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
            {formatter.dateFormatter(item.date)}
          </Content>
        </Content>
        }
      </Content>
      <Content className="product-image">
        <Content 
          className="image-detail" 
          style={contentStyle}>
          {item && item.face}
        </Content>
      </Content>
    </Content>
  )
}

export default Product