import React, { useEffect, useReducer, useState } from 'react'
import Container from "../components/Container"
import Header from '../components/Header'
import { ProductList } from '../components/List'
import { productData, constants } from '../reducers'
import axios from 'axios'
import { Selector } from '../components/Selector'
import { Content } from '../components/Content'
import { generateIds } from '../utils'
import { Loader } from '../components/Loader'

/** Fragment component of react */
const { Fragment } = React
/** getting constants value */
const { productContants } = constants
/** getting productData for reducer values */
const { initialProductState, productReducer } = productData

/**
 * Main component of app
 */
const Main = () => {
  /** use useReducer for more complex state management */
  const [state, dispatch] = useReducer(productReducer, initialProductState)
  /** use usetState hooks for loader visibity */
  const [showLoader, setLoaderVisibility] = useState(false)

  /** function that fetching products with condition depending on state */
  const getProducts = async () => {
    await dispatch({ type: productContants.FETCHING_PRODUCTS, payload: true })
    const result = await axios(`http://localhost:3000/products?_limit=50&_page=${state.page}&_sort=${state.sort}`)
    return result
  }

  /**
   * Action trigger to fetch the next batch of products and put 
   * to temporary newProducts state to not show directly in page
   */
  const handleNextFetchProducts = async () => {
    try {
      /** setting fetching status to true */
      /** getting the next products */
      dispatch({ type: productContants.FETCHING_PRODUCTS, payload: true })
      const { data } = await getProducts()
      /** setting the new products to temp array in reducer using dispatch */
      await dispatch({ type: productContants.SET_NEXT_PRODUCT, payload: data })
      dispatch({ type: productContants.FETCHING_PRODUCTS, payload: false })
    } catch (error) {
      /** throw error when caught */
      throw new Error(error.message)
    }
  }


  /**
   * 
   * @param {Array[]} arr, sets new array of ids for unique random ads after every 20 items
   */
  const handleSetIds = async (arr) => {
    const ids = generateIds(arr)
    dispatch({ type: productContants.SET_ADS, payload: ids })
  }

  /**
   * async function that handle sorting and change states
   */
  const handleSort = async (item) => {
    /**
     * set fetching state with sorting value and set values to default/initial
     */
    setLoaderVisibility(true)
    await dispatch({ type: productContants.SORT_PRODUCTS, payload: item })
  }

  const handleScroll = async () => {
    /**
     * a constant variable that determines the client user at second to the last of page component bottom or
     * at top of last raw of component of page
     */
    const atLastEndOfSecondLastComponent = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight) - 300

    if (!state.fetching && state.newProducts.length <= 0 && !state.endOfProducts) {
      // allow more fetch when reach the bottom
      await handleNextFetchProducts()
    }

    /** check if client has reached the specified condition above  */
    if (atLastEndOfSecondLastComponent) {
      /** dispatching end of fetch of products when nothing left */
      if (!state.newProducts.length && !state.fetching) {
        dispatch({ type: productContants.END_PRODUCTS })
      } else {
        /** 
         * insert values of product from newProducts to products state by dispatch 
         */
        setLoaderVisibility(true)
        await dispatch({
          type: productContants.INSERT_PRODUCTS,
        })
        await handleSetIds(state.products)
        setLoaderVisibility(false)
      }
    }

  }

  /**
   * to support scroll bind with hooks
   */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  /**
   * effect that triggers when sorting was changeed and assigned
   */
  useEffect(() => {
    const effect = async () => {
      /**
       * fetch data from api
       */
      const { data } = await getProducts()
      const newArray = [...state.products, ...data]
      await handleSetIds(newArray)
      /**
       * Dispatch the gathered data to local reducer
       */
      await dispatch({ type: productContants.SET_PRODUCTS, payload: data })
      setLoaderVisibility(false)

    }
    effect()
  }, [state.sort !== null && state.sort]);

  /**
   * initial fetch of product like componendDidMount
   */
  useEffect(() => {
    /**
     * this method enable async function inside useEffect
     */
    const fetchInitialProducts = async () => {
      try {
        /** set state fetching to true by dispatch */
        /** get the value of products */
        setLoaderVisibility(true)
        const { data } = await getProducts()
        await handleSetIds(data)

        // const ids = generateIds(data)
        /** set the products with dispatch of useReducer hooks */
        await dispatch({ type: productContants.SET_PRODUCTS, payload: data })
        await setLoaderVisibility(false)
        // dispatch({ type: productContants.SET_ADS, payload: ids })
      } catch (error) {
        /** if error occur it throws errors */
        throw new Error(error.message)
      }
    }
    fetchInitialProducts()
  }, [state.products.length < 0])

  return (
    <Fragment>
      <Header />
      <Container viewContainer>
        {!showLoader ?
          <React.Fragment>
            <Selector handleSort={handleSort} />
            <ProductList products={state.products || []} ads={state.ads} />
            {state.endOfProducts && <Content>~ end of catalogue ~</Content>}
          </React.Fragment>
          :
          <Loader />
        }
      </Container>
    </Fragment>
  )
}

export default Main