import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";




const toastSlicer = createSlice({
    name:"toasts",
    initialState:{
        elements:[]
    },
    reducers:{
        addErrorToast:(state, action) => {
            state.elements = [...state.elements, action.payload];
        },
        deleteToast:(state, action) => {
            state.elements = state.elements.filter(element => element.id !== action.payload)
        },
        deleteToasts:(state) => {
            state.elements = []
        }
    }
})

export const {addErrorToast, deleteToast, deleteToasts} = toastSlicer.actions;
export default toastSlicer.reducer;