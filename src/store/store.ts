import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import bookSlice from "./bookSlice";

const persistConfig = {
  key: "root",
  storage,
  // blacklist: [],
};

const rootReducer = combineReducers({
  book: bookSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);
export { store, persistor };
