import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {categoryState, categoryType } from "../type";
import axios from "axios";

const initialState: categoryType = {
    categories: [],
    loading: false,
    error: null,
}

export const getCategories = createAsyncThunk('product/getCategories', async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/categories');
          return response.data.Categories;
        } catch (error: any) {
            return 'An error occurred during register.';
        }
      }
);
// export const createProduct = createAsyncThunk('product/createProduct',
//     async (credentials: {name: string, description: string, brand: string, category_id: number, color_id: number, size_id: number, price: number, stock: number }, { rejectWithValue }) => {
//         try {
//         const response = await axios.post('http://127.0.0.1:8000/api/addProduct', credentials);
//         console.log(response.data);
//         return response.data;
//         } catch (error: any) {
//             return rejectWithValue(error);
//         }
//     }
// );

const CategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(getCategories.pending, (state) => {
            state.loading= true
        })
        .addCase(getCategories.fulfilled, (state, action:PayloadAction<categoryState[]>) => {
            state.loading= false;
            state.categories = action.payload;
        })
        .addCase(getCategories.rejected, (state, action) => {
            state.loading= true
            state.error= action.error.message ? action.error.message : '';
        })

        // .addCase(createProduct.pending, (state) => {
        //     state.loading= true
        // })
        // .addCase(createProduct.fulfilled, (state, action) => {
        //     state.loading= false;
        //     state.products.push(action.payload);
        //     console.log(action);
        // })
        // .addCase(createProduct.rejected, (state, action) => {
        //     state.loading= true
        //     state.error= action.error.message ? action.error.message : '';
        //     console.log(action);
        // })
    },
});


export default CategorySlice.reducer;