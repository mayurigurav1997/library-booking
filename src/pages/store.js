
import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import userReducer from '../redux/feature/user/userSlice'; // Import your API slice
import { userReducer } from './feature/user/userSlice'

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

// export const store = configureStore({
//     reducer: {
//         users: userReducer,
//     }
// })