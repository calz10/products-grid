import { productContants } from './constants'

const initialProductState = {
  products: [],
  newProducts: [],
  fetching: [],
  endOfProducts: [],
  pageButtom: false,
  page: 0
}

const {
  SET_PRODUCTS,
  FETCHING_PRODUCTS,
} = productContants

const productReducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: [...action.payload, { face: null }],
        page: 1
      }
    case FETCHING_PRODUCTS:
      return {
        ...state,
        fetching: !state.fetching
      }
    default:
      return state
  }
}

export {
  productReducer,
  initialProductState
}