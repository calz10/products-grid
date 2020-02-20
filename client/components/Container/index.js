import React from 'react'
import './index.less'
import { Content } from '../Content'

/**
 * Container component to hold child component
 * @param {*} props
 */
const Container = ({ viewContainer = false, ...props }) => (
  <Content className={`container ${viewContainer ? 'padHeader' : null}`} {...props}>
    {props.children}
  </Content>
)

export default Container