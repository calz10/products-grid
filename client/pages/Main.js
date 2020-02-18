import React, { useEffect, useReducer } from 'react'
import Container from "../components/Container"
import Header from '../components/Header'
import { ProductList } from '../components/List'
import { productData, constants } from '../reducers'
import axios from 'axios'

const { Fragment } = React
const { productContants } = constants

const { initialProductState, productReducer } = productData

const Main = () => {

  const [state, dispatch] = useReducer(productReducer, initialProductState)

  const getProducts = async () => await axios(`http://localhost:3000/products?_limit=50&_page=${state.page}&_sort=${state.sort}`)

  const handleNextFetchProducts = async () => {
    try {
      dispatch({ type: productContants.FETCHING_PRODUCTS, payload: true })
      const { data } = await getProducts()
      dispatch({ type: productContants.SET_NEXT_PRODUCT, payload: data })
    } catch (error) {
      throw new Error(error.message)
    }
  }
  
  const handleSort = async() => {
    await dispatch({ type: productContants.SET_PAGE, page: 1 })
    await dispatch({type: productContants.SORT_PRODUCTS, payload: 'price'})
  }

  const handleScroll = async () => {
    /**
     * a constant variable that determines the client user at second to the last of page component bottom or
     * at top of last raw of component of page
     */
    const atLastEndOfSecondLastComponent = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight) - 300

    if (atLastEndOfSecondLastComponent) {
      dispatch({
        type: productContants.INSERT_PRODUCTS,
      })
    }

    if (!state.fetching && state.newProducts.length <= 0) {
      await handleNextFetchProducts()
    }
  }

  useEffect(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    const effect = async() => {
      const { data } = await getProducts()
      dispatch({ type: productContants.SET_PRODUCTS, payload: data })
    }
    effect()
  },[state.sort !== null && state.sort]);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        dispatch({ type: productContants.FETCHING_PRODUCTS, payload: true })
        const { data } = await getProducts()
        dispatch({ type: productContants.SET_PRODUCTS, payload: data })
      } catch (error) {
        throw new Error(error.message)
      }
    }
    fetchInitialProducts()
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