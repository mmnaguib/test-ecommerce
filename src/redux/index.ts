import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthSlice from "./slices/AuthSlice"
import ProductSlice from "./slices/ProductSlice";
const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuth = persistReducer(persistConfig, AuthSlice);
const persistedProducts = persistReducer(persistConfig, ProductSlice);

const store = configureStore({
  reducer: {
    auth: persistedAuth,
    product: persistedProducts
  },
});
const persistor = persistStore(store);
export { store, persistor };

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch