import { createSlice } from '@reduxjs/toolkit';
import mockData from '../../data/MockData.json';

const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipeList: mockData,
    },
    reducers: {

    }
});

export const selectRecipes = (state) => state.recipes.list;
export default recipeSlice.reducer;
