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
);
export const createProduct = createAsyncThunk('product/createProduct',
    async (credentials: {name: string, description: string, brand: string, category_id: number, color_id: number, size_id: number, price: number, stock: number }, { rejectWithValue }) => {
        try {
        const response = await axios.post('http://127.0.0.1:8000/api/addProduct', credentials);
        return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
    );
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

        .addCase(createProduct.pending, (state) => {
            state.loading= true
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.loading= false;
            state.products.push(action.payload);
            console.log(action);
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.loading= true
            state.error= action.error.message ? action.error.message : '';
        })
    },
});


export default ProductSlice.reducer;