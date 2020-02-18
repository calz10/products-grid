import { productContants } from './constants'

const initialProductState = {
  products: [],
  newProducts: [],
  fetching: false,
  endOfProducts: [],
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
  SET_PAGE
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
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      }
    case FETCHING_PRODUCTS:
      return {
        ...state,
        fetching: action.payload
      }
    case SET_NEXT_PRODUCT:
      return {
        ...state,
        newProducts: action.payload
      }
    case SORT_PRODUCTS:
      return {
        ...state,
        sort: action.payload,
        newProducts: [],
      }
    case INSERT_PRODUCTS: {
      return {
        ...state,
        newProducts: [],
        products: [...state.products, ...state.newProducts],
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