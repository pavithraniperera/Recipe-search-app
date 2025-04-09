import { useState } from "react";
import { useSelector } from "react-redux";

import RecipeCard from "../components/RecipeCard";
import {RootState} from "../store/store.ts";

const HomePage = () => {
    const [sortBy, setSortBy] = useState("popular");

    // Updated: use proper type for state
    const recipes = useSelector((state: RootState) => state.recipes.recipeList || []);

    return (
        <div className="min-h-screen bg-orange-50 dark:bg-gray-900 transition-colors duration-300 pb-12 pt-10">
            {/* Hero Section */}
            <div className="bg-orange-500 text-white py-16 text-center px-4 shadow-md">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Delicious Recipes</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Explore a world of flavors. Save your favorites, share your own, and cook with passion.
                </p>
            </div>

            {/* Filter & Sort */}
            <div className="max-w-6xl mx-auto px-4 mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
                <input
                    type="text"
                    placeholder="Search for recipes..."
                    className="w-full md:w-1/2 px-4 py-2 rounded-full shadow-sm border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-full border border-orange-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                    <option value="popular">Most Popular</option>
                    <option value="recent">Recently Added</option>
                    <option value="easy">Easy to Make</option>
                </select>
            </div>

            {/* Recipe Grid */}
            <div className="max-w-6xl mx-auto px-4 mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {recipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        title={recipe.title}
                        image={recipe.image}
                        description={recipe.description}
                        cookingTime={recipe.cookingTime}
                        rating={recipe.rating}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
