import * as actions from "../actions/actionTypes";

const initialState = {
  products: [],
};

export default function productReducer (state = initialState, action) {
  switch (action.type) {
    case actions.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case actions.GET_SUBCAT:
        return {
          ...state,
          subCategories: action.payload,
        };
    case actions.GET_MCAT:
        return {
          ...state,
          mCategories: action.payload,
          };
    case actions.DEL_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    case actions.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case actions.ADD_FEEDBACK:
      return {
        ...state,
        products: state.products.map(product =>
          product.id == action.payload.feedback.product ? { ...product,feedbacks:[...product.feedbacks, action.payload.feedback]} : product
        ),
        };
    default:
      return state;
  }
}
