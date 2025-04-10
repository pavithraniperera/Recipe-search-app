import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockData from '../../data/MockData.json';

interface Recipe {
    id: number;
    title: string;
    description: string;
    cookingTime: number;
    rating: number;
    image: string;
    ingredients: string[];
    steps: string[];
}


const initialState = {
    recipeList: mockData,
};

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        addRecipe: (state, action: PayloadAction<Recipe>) => {
            state.recipeList.push(action.payload);
        },
        removeRecipe: (state, action: PayloadAction<number>) => {
            state.recipeList = state.recipeList.filter(r => r.id !== action.payload);
        },
        updateRecipe: (state, action: PayloadAction<Recipe>) => {
            const index = state.recipeList.findIndex(r => r.id === action.payload.id);
            if (index !== -1) {
                state.recipeList[index] = action.payload;
            }
        },
    },
});

export const { addRecipe, removeRecipe, updateRecipe } = recipeSlice.actions;
export const selectRecipes = (state: any) => state.recipes.recipeList;
export default recipeSlice.reducer;
