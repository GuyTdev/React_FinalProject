import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
import customersReducer from '../features/customers/customersSlice'
import purchasesReducer from '../features/purchases/purchasesSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    customers: customersReducer,
    purchases: purchasesReducer,
    user: userReducer,
  },
})
