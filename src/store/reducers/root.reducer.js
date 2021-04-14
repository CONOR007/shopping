import { combineReducers } from 'redux';
import productReducer from './product.reducer';
import cartReducer from './cart.reducer';

// { products: [], carts: [] }
// combineReducers:合并每一个小的reducer
export default combineReducers({
  products: productReducer,
  carts: cartReducer
})