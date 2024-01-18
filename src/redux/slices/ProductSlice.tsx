import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productState, productType } from "../type";
import axios from "axios";

const initialState: productType = {
    products: [],
    loading: false,
    error: null,
}

export const getProducts = createAsyncThunk('product/getProducts', async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/products');
          return response.data.products;
        } catch (error: any) {
            return 'An error occurred during register.';
        }
      }
)

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(getProducts.pending, (state) => {
            state.loading= true
        })
        .addCase(getProducts.fulfilled, (state, action:PayloadAction<productState[]>) => {
            state.loading= false;
            state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.loading= true
            state.error= action.error.message ? action.error.message : '';
        })
    },
});


export default ProductSlice.reducer;