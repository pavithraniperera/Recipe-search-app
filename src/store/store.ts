import { configureStore } from '@reduxjs/toolkit';
import authSlice from "../features/auth/AuthSlice.ts";
import recipeSlice from "../features/recipes/RecipeSlice.ts";


const store = configureStore({
    reducer: {
        auth: authSlice,
        recipes: recipeSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
