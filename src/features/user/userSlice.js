import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: sessionStorage.getItem("userEmail"),
  isAdmin: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFirebaseFetchedUser: (state, action) => {
        state.email = action.payload;
    },
    setUserRoleAsAdmin: (state) => {
         state.isAdmin = true;
    },
    setUserRoleAsSimpleUser: (state) => {
         state.isAdmin = false;
    },

  },
})

// Action creators are generated for each case reducer function
export const { setFirebaseFetchedUser, setUserRoleAsAdmin, setUserRoleAsSimpleUser  } = userSlice.actions

export default userSlice.reducer