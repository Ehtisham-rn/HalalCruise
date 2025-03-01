import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Reducer from "./Reducer";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  debug: true, // Enable logging
};

const persistedReducer = persistReducer(persistConfig, Reducer);

// Middleware configuration including ignoring specific actions
const middleware = (getDefaultMiddleware) => {
  return getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware,
});

const persistor = persistStore(store);

export { store, persistor };
