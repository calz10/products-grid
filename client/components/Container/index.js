import React from 'react'
import './index.less'
import { Content } from '../Content'

const Container = ({ viewContainer = false, ...props }) => (
  <Content className={`container ${viewContainer ? 'padHeader' : null}`} {...props}>
    {props.children}
  </Content>
)

export default Container