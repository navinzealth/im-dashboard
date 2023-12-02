import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    showLeftBar:true,
}

const leftbarSlice = createSlice({
    name:'showleftbar',
    initialState,
    reducers:{
        leftBarHide:(state,action)=>{
            //console.log(action);
            state.showLeftBar = false;
            state.payload = action.payload; // Include payload in state
        },
        leftBarShow:(state,action)=>{
            //console.log(action);
            state.showLeftBar = true;
            state.payload = action.payload; // Include payload in state
        }
    }
})

export const {leftBarHide, leftBarShow} = leftbarSlice.actions;
export default leftbarSlice.reducer;