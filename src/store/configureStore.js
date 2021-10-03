import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducer";
import logger from "./middleware/logger";
import api from "./middleware/api";
import toastify from "./middleware/toastify";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({ serializableCheck: false }),
    logger("console"),
    api,
    toastify,
  ],
});

export const persistor = persistStore(store);
