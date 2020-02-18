import React, { useState } from 'react'
import { Content } from '../Content'
import { SelectorCard } from '../Card'
import './index.less'

const Selector = (props) => {
  const [visibleItems, setVisibleItems] = useState(false)
  const [selectedItem, setSelectedSorting] = useState(null)

  const setSelectedItem = (item) => {
    setSelectedSorting(item)
    setVisibleItems(false)
    props.handleSort(item)
  }

  return (
    <Content className="selector-wrapper">
      <Content className="selector-header" onClick={() => setVisibleItems(!visibleItems)}>
        {selectedItem ? `SORTED BY: ${selectedItem.toUpperCase()} ` : `SELECT SORT `}{<span className={`fa fa-chevron-${visibleItems?'up': 'down'}`}></span>}
      </Content>
      {visibleItems ?
        <Content>
          <SelectorCard handleSelect={setSelectedItem}/>
        </Content> : null
      }
    </Content>
  )
}

export default Selector