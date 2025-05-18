import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipeCard from "../components/RecipeCard";
import { addRecipe } from "../features/recipes/RecipeSlice";
import AddRecipeModal from "../components/AddRecipeModal";
import { RootState } from "../store/store.ts";
import { ChefHat, Heart, Plus, Settings, Bookmark, User, Edit3 } from "lucide-react";

const ProfilePage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const recipeList = useSelector((state: RootState) => state.recipes.recipeList);

    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("recipes");
    const dispatch = useDispatch();

    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    const idsOnly = parsed.map((fav: { recipeId: number }) => fav.recipeId);
                    setFavoriteIds(idsOnly);
                }
            } catch (error) {
                console.error("Failed to parse favorites:", error);
            }
        }
    }, []);

    const userRecipes = useMemo(() => {
        return recipeList.filter((recipe) => recipe.createdBy === user?.userId);
    }, [recipeList, user?.userId]);

    const favoriteRecipes = useMemo(() => {
        return recipeList.filter((recipe) => favoriteIds.includes(recipe.id));
    }, [recipeList, favoriteIds]);

    const handleAddRecipe = (recipeData: {
        title: string;
        cookingTime: string;
        rating: string | number;
        image: File | null;
    }) => {
        const newRecipe = {
            id: Date.now(), // Using timestamp as unique ID
            title: recipeData.title,
            cookingTime: recipeData.cookingTime,
            rating: Number(recipeData.rating),
            image: recipeData.image ? URL.createObjectURL(recipeData.image) : "",
            createdBy: user?.userId || "defaultUserId",
            createdAt: new Date().toISOString(),
        };

        dispatch(addRecipe(newRecipe));
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 pb-20">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-500/20 dark:from-gray-800/80 dark:to-gray-900/80"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 mb-6">
                        <User className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                        Welcome back, <span className="text-amber-200">{user?.name || "Chef"}</span>
                    </h1>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto">
                        Your culinary journey in one place
                    </p>
                </div>
            </div>

            {/* Profile Content */}
            <div className="max-w-7xl mx-auto px-4 -mt-16">
                {/* Profile Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mb-10 border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row items-start gap-8 p-8">
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                                <img
                                    src={user?.profileImage || "/assets/Profile.jpg"}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute bottom-3 right-3 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all transform group-hover:scale-110">
                                <Edit3 className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">{user?.email}</p>
                                </div>
                                <button className="p-2 text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                    <Settings className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-6">
                                <div className="bg-amber-50 dark:bg-gray-700/50 px-6 py-3 rounded-xl flex items-center gap-3">
                                    <ChefHat className="text-amber-500 dark:text-amber-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Recipes</p>
                                        <p className="font-bold text-gray-800 dark:text-white">{userRecipes.length}</p>
                                    </div>
                                </div>
                                <div className="bg-orange-50 dark:bg-gray-700/50 px-6 py-3 rounded-xl flex items-center gap-3">
                                    <Heart className="text-orange-500 dark:text-orange-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Favorites</p>
                                        <p className="font-bold text-gray-800 dark:text-white">{favoriteRecipes.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="border-t border-gray-100 dark:border-gray-700 flex overflow-x-auto">
                        <button
                            onClick={() => setActiveTab("recipes")}
                            className={`flex-1 py-4 font-medium flex items-center justify-center gap-2 ${activeTab === "recipes" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500 dark:text-gray-400"}`}
                        >
                            <ChefHat className="w-5 h-5" />
                            Your Recipes
                        </button>
                        <button
                            onClick={() => setActiveTab("favorites")}
                            className={`flex-1 py-4 font-medium flex items-center justify-center gap-2 ${activeTab === "favorites" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500 dark:text-gray-400"}`}
                        >
                            <Heart className="w-5 h-5" />
                            Favorites
                        </button>
                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`flex-1 py-4 font-medium flex items-center justify-center gap-2 ${activeTab === "saved" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500 dark:text-gray-400"}`}
                        >
                            <Bookmark className="w-5 h-5" />
                            Collections
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="space-y-10">
                    {activeTab === "recipes" && (
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Your Creations</h3>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl transition flex items-center gap-2 shadow-lg hover:shadow-orange-200 dark:hover:shadow-orange-900/30"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Recipe
                                </button>
                            </div>

                            <AddRecipeModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onSubmit={handleAddRecipe}
                            />

                            {userRecipes.length === 0 ? (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-dashed border-gray-200 dark:border-gray-700">
                                    <ChefHat className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h4 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No recipes yet</h4>
                                    <p className="text-gray-500 mb-6">Start by adding your first recipe!</p>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition"
                                    >
                                        Create Recipe
                                    </button>
                                </div>
                            ) : (
                                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {userRecipes.map((recipe) => (
                                        <RecipeCard
                                            key={recipe.id}
                                            id={recipe.id}
                                            title={recipe.title}
                                            image={recipe.image}
                                            cookingTime={recipe.cookingTime}
                                            rating={recipe.rating}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "favorites" && (
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Favorite Recipes</h3>
                            {favoriteRecipes.length === 0 ? (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-dashed border-gray-200 dark:border-gray-700">
                                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h4 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No favorites yet</h4>
                                    <p className="text-gray-500">Save recipes you love to find them here later</p>
                                </div>
                            ) : (
                                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {favoriteRecipes.map((recipe) => (
                                        <RecipeCard
                                            key={recipe.id}
                                            id={recipe.id}
                                            title={recipe.title}
                                            image={recipe.image}
                                            cookingTime={recipe.cookingTime}
                                            rating={recipe.rating}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "saved" && (
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Your Collections</h3>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-dashed border-gray-200 dark:border-gray-700">
                                <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h4 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">Coming Soon!</h4>
                                <p className="text-gray-500">Organize your recipes into custom collections</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;