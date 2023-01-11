import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productsArray: [],
//   productsArray: [{id:1, title:"PC", price: 2200, quantity: 25}, {id:2, title:"Watch", price: 1200, quantity: 25}],
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFirebaseFetchedProducts: (state, action) => {
        state.productsArray = [...action.payload];
    },
    addProduct: (state, action) => {
      console.log("action.payload addProduct before id", action.payload);
      let productToAdd = {...action.payload, id:1}
      if(state.productsArray.length){
        productToAdd = {...productToAdd, id:state.productsArray[state.productsArray.length-1].id+1}
      }
      console.log("productToAdd after setting id", productToAdd);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.productsArray.push(productToAdd)
    },
    updateProductQuantity: (state, action) => {
      console.log("action.payload updateProductQuantity", action.payload);
      const indexToUpdate = state.productsArray.findIndex(product => +product.id === +action.payload)
      if(indexToUpdate!==-1 && state.productsArray[indexToUpdate].quantity>0) {
         state.productsArray[indexToUpdate].quantity--;//decrease quantity by one
      }else{
        console.log("No more products left");
      }
    },
    updateProduct: (state, action) => {
      console.log("action.payload.id updateProduct", action.payload.id);
      const indexToUpdate = state.productsArray.findIndex(product => +product.id === +action.payload.id)
      if(indexToUpdate!==-1) {
         state.productsArray[indexToUpdate].title = action.payload.title;//decrease quantity by one
         state.productsArray[indexToUpdate].price = action.payload.price;//decrease quantity by one
         state.productsArray[indexToUpdate].quantity = action.payload.quantity;//decrease quantity by one
      }else{
        console.log("Product not found");
      }
    },
    deleteProduct: (state, action) => {
      console.log("action.payload deleteProduct", action.payload);
      state.productsArray = state.productsArray.filter(product=> +product.id !== +action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFirebaseFetchedProducts, addProduct, updateProduct, updateProductQuantity, deleteProduct } = productsSlice.actions

export default productsSlice.reducer