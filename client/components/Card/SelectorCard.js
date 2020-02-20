import React from 'react'
import { Content } from '../Content'
import './index.less'

/**
 * Customized selector component
 * @param {*} props 
 */
const SelectorCard = (props) => (
  <Content className="selector-card">
    <Content className="selector-items-list">
      <Content className="selector-item" onClick={() => props.handleSelect(null)}>
        DEFAULT
      </Content>
      <Content className="selector-item" onClick={() => props.handleSelect('price')}>
        PRICE
      </Content>
      <Content className="selector-item" onClick={() => props.handleSelect('id')}>
        ID
      </Content>
      <Content className="selector-item" onClick={() => props.handleSelect('size')}>
        SIZE
      </Content>
    </Content>
  </Content>
)

/**
 * export the SelectorCard component
 */
export default SelectorCard