import { createSlice } from "@reduxjs/toolkit";

const loaderSlicer = createSlice({
    name:"loader",
    initialState:{
        value:false
    },
    reducers:{
        activateLoader:(state) => {state.value = true},
        deactivateLoader:(state) => {state.value = false}
    }
})

export const {activateLoader, deactivateLoader} = loaderSlicer.actions;
export default loaderSlicer.reducer;