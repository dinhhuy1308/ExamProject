import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: '',
    },
    isAuthenticated: false,
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    getUserLogin: (state, action) => {
        state.account = {...state, account: {
            access_token: action?.payload?.DT?.access_token,
            refresh_token: action?.payload?.DT?.refresh_token,
            username: action?.payload?.DT?.username,
            image: action?.payload?.DT?.image,
            role: action?.payload?.DT?.role,
        }};
        state.isAuthenticated = true;

        // console.log('state', state);
        // console.log('action', action);
    }
  }
});

export const {getUserLogin} = userReducer.actions

export default userReducer.reducer