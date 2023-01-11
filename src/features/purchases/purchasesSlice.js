import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  purchasesArray: [],
}

export const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    setFirebaseFetchedPurchases: (state, action) => {
        state.purchasesArray = [...action.payload];
    },
    addPurchase: (state, action) => {
      console.log("action.payload addPurchase before id", action.payload);
      let purchaseToAdd = {...action.payload}
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.purchasesArray.push(purchaseToAdd)
    },
    updatePurchase: (state, action) => {
      console.log("action.payload updatePurchase.id", action.payload.id);
      console.log("action.payload updatePurchase", action.payload);
      const indexToUpdate = state.purchasesArray.findIndex(user => +user.id === +action.payload.id)
      if(indexToUpdate!==-1) {
         state.purchasesArray[indexToUpdate] = action.payload;
      }
    },
    deletePurchase: (state, action) => {
      console.log("action.payload deletePurchase", action.payload);
      state.purchasesArray = state.purchasesArray.filter(purchase=> +purchase.id !== +action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFirebaseFetchedPurchases, addPurchase, updatePurchase, deletePurchase } = purchasesSlice.actions

export default purchasesSlice.reducer