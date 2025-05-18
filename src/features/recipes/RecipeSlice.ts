import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockData from '../../data/MockData.json';

interface Ingredient {
    name: string;
    amount: string;
    note?: string;
}

interface Step {
    number: number;
    instruction: string;
    timer?: number;
    timerUnit?: string;
}

interface Nutrition {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
}

interface Recipe {
    id: number;
    title: string;
    image: string;
    cookingTime: string;
    prepTime: string;
    servings: number;
    difficulty: string;
    rating: number;
    category: string;
    likes: number;
    views: number;
    createdAt: string;
    createdBy: string;
    author?: string;
    description: string;
    ingredients: Ingredient[];
    steps: Step[];
    tips?: string[];
    variations?: string[];
    nutrition: Nutrition;
}

interface RecipeState {
    recipeList: Recipe[];
}

const initialState: RecipeState = {
    recipeList: mockData as Recipe[],
};

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        addRecipe: (state, action: PayloadAction<Omit<Recipe, 'id' | 'createdAt' | 'likes' | 'views'>>) => {
            const newRecipe: Recipe = {
                ...action.payload,
                id: Date.now(),
                createdAt: new Date().toISOString(),
                likes: 0,
                views: 0
            };
            state.recipeList.push(newRecipe);
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
        likeRecipe: (state, action: PayloadAction<number>) => {
            const recipe = state.recipeList.find(r => r.id === action.payload);
            if (recipe) {
                recipe.likes += 1;
            }
        },
        incrementViews: (state, action: PayloadAction<number>) => {
            const recipe = state.recipeList.find(r => r.id === action.payload);
            if (recipe) {
                recipe.views += 1;
            }
        }
    },
});

export const { addRecipe, removeRecipe, updateRecipe, likeRecipe, incrementViews } = recipeSlice.actions;
export const selectRecipes = (state: { recipes: RecipeState }) => state.recipes.recipeList;
export const selectRecipeById = (id: number) => (state: { recipes: RecipeState }) =>
    state.recipes.recipeList.find(recipe => recipe.id === id);

export default recipeSlice.reducer;