// rxslice

import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    dataProduct: [],
}

const shopReducer = createSlice({
  name: 'shopReducer',
  initialState,
  reducers: {
    getProductApiAction: (state, action) => {
        // console.log('action')
        state.dataProduct = action.payload;
    }
  }
});

export const {getProductApiAction} = shopReducer.actions

export default shopReducer.reducer



// -------- action thunk ------------------
export const getAllProduct = () => {
    return async (dispatch, getState) => {
        try {
            const resp = await axios.get('.....');
            console.log(resp);
            const action =  getProductApiAction(resp.data.content);
            dispatch(action);

            // Xử lý dispatch 
            // dispatch({
            //     type: 'shopReducer/getProductApi',
            //     action: resp.data.content,
            // })
        } catch (err) {
            console.log(err);
        }
    }
}

