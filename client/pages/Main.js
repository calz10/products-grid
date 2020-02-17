import React, { useState, useEffect, useReducer } from 'react'
import Container from "../components/Container"
import Header from '../components/Header'
import { ProductList } from '../components/List'
import { productData, constants } from '../reducers'

const { Fragment } = React
const { productContants } = constants

const Main = () => {
  const { initialProductState, productReducer } = productData
  const [state, dispatch] = useReducer(productReducer, initialProductState)

  useEffect(() => {
    dispatch({ type: productContants.FETCHING_PRODUCTS })
    fetch('http://localhost:3000/products?_limit=20&_page=1')
      .then((res) => {
        res.json()
          .then((data) => {
            dispatch({ type: productContants.SET_PRODUCTS, payload: data})
          })
      })
  }, [state.products.length < 0])

  return (
    <Fragment>
      <Header />
      <Container viewContainer>
        <ProductList products={state.products || []} />
      </Container>
    </Fragment>
  )
}

export default Main