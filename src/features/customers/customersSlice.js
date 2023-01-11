import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  customersArray: [],
//   customersArray: [{id:1, fname:"Avi", lname: "Nimny", City:"Ashdod"}, {id:1, fName:"Eran", lName: "Zahavi", City:"Tel-Aviv"}],
}

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setFirebaseFetchedCustomers: (state, action) => {
        state.customersArray = [...action.payload];
    },
    addCustomer: (state, action) => {
      console.log("action.payload addCustomer before id", action.payload);
      let customerToAdd = {...action.payload, id:1}
      if(state.customersArray.length){
        customerToAdd = {...customerToAdd, id:state.customersArray[state.customersArray.length-1].id+1}
      }
      console.log("customerToAdd after setting id", customerToAdd);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.customersArray.push(customerToAdd)
    },
    updateCustomer: (state, action) => {
      console.log("action.payload updateCustomer.id", action.payload.id);
      console.log("action.payload updateCustomer", action.payload);
      const indexToUpdate = state.customersArray.findIndex(user => +user.id === +action.payload.id)
      if(indexToUpdate!==-1) {
         state.customersArray[indexToUpdate] = action.payload;
      }
    },
    deleteCustomer: (state, action) => {
      console.log("action.payload deleteCustomer", action.payload);
      state.customersArray = state.customersArray.filter(customer=> +customer.id !== +action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFirebaseFetchedCustomers, addCustomer, updateCustomer, deleteCustomer } = customersSlice.actions

export default customersSlice.reducer