import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './user/userSlice';


const rootReducer = combineReducers({
    user: userReducer,
});

export default configureStore({
    reducer: rootReducer,
    // preloadedState: loadFromLocalStorage(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: true
        })
})
