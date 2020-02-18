import { productContants } from './constants'

const initialProductState = {
  products: [],
  newProducts: [],
  fetching: false,
  endOfProducts: false,
  pageButtom: false,
  inserted: false,
  sort: null,
  page: 1
}

const {
  SET_PRODUCTS,
  FETCHING_PRODUCTS,
  INSERT_PRODUCTS,
  SET_NEXT_PRODUCT,
  SORT_PRODUCTS,
  END_PRODUCTS
} = productContants

function productReducer(state, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        page: state.page + 1,
        fetching: false,
      }
    case FETCHING_PRODUCTS:
      return {
        ...state,
        fetching: action.payload
      }
    case END_PRODUCTS:
      return {
        ...state,
        endOfProducts: true
      }
    case SET_NEXT_PRODUCT:
      return {
        ...state,
        newProducts: action.payload
      }
    case SORT_PRODUCTS:
      return {
        ...state,
        page: 1,
        sort: action.payload,
        newProducts: [],
      }
    case INSERT_PRODUCTS: {
      return {
        ...state,
        newProducts: [],
        products: [
          ...state.products,
          ...state.newProducts
        ],
        page: state.page + 1,
        fetching: false
      }
    }
    default:
      return state
  }
}

export {
  productReducer,
  initialProductState
}