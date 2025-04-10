import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import {addRecipe} from "../features/recipes/RecipeSlice.ts";
import AddRecipeModal from "../components/AddRecipeModal.tsx"; // adjust the path based on your setup

const ProfilePage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const recipeList = useSelector((state: RootState) => state.recipes.recipeList);

    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

    // Get favorite recipe IDs from localStorage on load
    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setFavoriteIds(parsed);
                }
            } catch (error) {
                console.error("Failed to parse favorites:", error);
            }
        }
    }, []);

    // Recipes created by this user
    const userRecipes = recipeList.filter((recipe) => recipe.createdBy === user?.userId);

    // Favorite recipes (matched from recipeList using IDs)
    const favoriteRecipes = recipeList.filter((recipe) => favoriteIds.includes(recipe.recipeId));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleAddRecipe = (recipeData) => {
        const newRecipe = {
            id: new Date().toISOString(), // Assuming the ID is generated based on current time
            title: recipeData.title,
            cookingTime: recipeData.cookingTime,
            rating: Number(recipeData.rating),
            imageUrl: recipeData.image ? URL.createObjectURL(recipeData.image) : "",
            createdBy: user?.userId || "defaultUserId",
        };

        dispatch(addRecipe(newRecipe)); // Dispatch the action to add the recipe
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className="min-h-screen bg-orange-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 pb-20">
            {/* Header */}
            <div className="bg-orange-500 text-white py-16 text-center px-4 shadow-md">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Hello, {user?.name || "User"}!</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Manage your profile, favorite recipes, and add your own creations!
                </p>
            </div>

            {/* Profile Section */}
            <div className="max-w-6xl mx-auto px-4 mt-10">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Profile Image */}
                        <div
                            className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-2 border-orange-500">
                            <img
                                src={user?.profileImage || "src/assets/Profile.jpg"}
                                alt="User"
                                className="w-full h-full object-cover"
                            />
                            <label className="absolute bottom-0 right-0 bg-orange-500 p-1 rounded-full cursor-pointer">
                                <input type="file" className="hidden" accept="image/*"/>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M4 3a1 1 0 011-1h4.586A2 2 0 0111 2.586l2.828 2.828A2 2 0 0115 7.414V17a1 1 0 01-1 1H5a1 1 0 01-1-1V3z"/>
                                </svg>
                            </label>
                        </div>

                        {/* User Info */}
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">{user?.name}</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{user?.email}</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-10">
                        <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">Your Recipes</h3>
                        <button
                            onClick={() => setIsModalOpen(true)} // Trigger modal open
                            className="px-6 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
                        >
                            Add Recipe
                        </button>
                    </div>

                    {/* Display Modal */}
                    <AddRecipeModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)} // Close modal when clicked outside or after submission
                        onSubmit={handleAddRecipe} // Pass the handleSubmit function
                    />

                    {/* User Recipes */}
                    <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {userRecipes.length === 0 ? (
                            <p className="col-span-full text-center text-gray-500">No recipes added yet.</p>
                        ) : (
                            userRecipes.map((recipe) => (
                                <RecipeCard key={recipe.recipeId} {...recipe} />
                            ))
                        )}
                    </div>

                    {/* Favorites */}
                    <div className="mt-14">
                        <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-3">Favorites</h3>
                        <div
                            className="flex overflow-x-auto space-x-6 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-100 pb-2">
                            {favoriteRecipes.length === 0 ? (
                                <p className="text-gray-500">You haven’t favorited any recipes yet.</p>
                            ) : (
                                favoriteRecipes.map((recipe) => (
                                    <div key={recipe.recipeId} className="min-w-[250px] flex-shrink-0">
                                        <RecipeCard {...recipe} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
