import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Star, Clock, Utensils, ChevronLeft, Heart, Edit3, Trash2, Users, Flag, AlertTriangle } from "lucide-react";
import clsx from "clsx";
import {
    addFavorite,
    removeFavorite,
    isFavorite,
} from "../utils/favoriteUtils";
import { removeRecipe } from "../features/recipes/RecipeSlice.ts";

const RecipeDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const recipe = useSelector((state: any) =>
        state.recipes.recipeList.find((r: any) => r.id === parseInt(id || "0"))
    );

    const user = useSelector((state: any) => state.auth.user);
    const [isSaved, setIsSaved] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const isOwner = user && recipe && user.userId === recipe.createdBy;

    useEffect(() => {
        console.log(recipe.image)
        if (user && recipe) {
            setIsSaved(isFavorite(user.userId, recipe.id));
        }
    }, [user, recipe]);

    const handleToggleFavorite = () => {
        if (!user) return alert("You must be logged in to save favorites");

        if (isSaved) {
            removeFavorite(user.userId, recipe.id);
        } else {
            addFavorite(user.userId, recipe.id);
        }
        setIsSaved(!isSaved);
    };

    const handleDeleteRecipe = (recipeId: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
        if (!confirmDelete) return;

        dispatch(removeRecipe(recipeId));
        navigate("/home");
    };

    if (!recipe) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <div className="text-5xl mb-4">🍳</div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Recipe Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">The recipe you're looking for doesn't exist or may have been removed.</p>
                    <button
                        onClick={() => navigate("/home")}
                        className="px-6 pt-2.5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition flex items-center gap-2 mx-auto"
                    >
                        <ChevronLeft size={18} />
                        Back to Recipes
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/home")}
                    className="flex items-center gap-2 mb-8 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                >
                    <ChevronLeft size={20} />
                    <span className="font-medium">Back to recipes</span>
                </button>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                    {/* Recipe Image with Loading State */}
                    <div className="relative h-80 sm:h-96 w-full">
                        {isImageLoading && (
                            <div
                                className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-t-3xl"></div>
                        )}
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                            onLoad={() => setIsImageLoading(false)}

                        />
                        {/* Favorite Button Floating */}
                        <button
                            onClick={handleToggleFavorite}
                            className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 ${isSaved ? 'bg-red-500 hover:bg-red-600' : 'bg-white/90 hover:bg-white'} ${!user && 'hidden'}`}
                            aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
                        >
                            <Heart
                                size={24}
                                className={clsx("transition-colors", {
                                    "fill-white text-white": isSaved,
                                    "text-red-500 fill-transparent hover:fill-red-500/20": !isSaved,
                                })}
                            />
                        </button>
                    </div>

                    <div className="p-6 sm:p-8 space-y-6">
                        {/* Recipe Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                    {recipe.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                                    <span className="flex items-center gap-1.5">
                                        <Clock size={16} className="text-orange-500" />
                                        {recipe.cookingTime} (Prep: {recipe.prepTime})
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Users size={16} className="text-orange-500" />
                                        Serves: {recipe.servings}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={clsx("transition", {
                                                    "text-yellow-400 fill-yellow-400": i <= Math.round(recipe.rating),
                                                    "text-gray-300 dark:text-gray-600": i > Math.round(recipe.rating),
                                                })}
                                            />
                                        ))}
                                        <span className="ml-1">({recipe.rating.toFixed(1)})</span>
                                    </div>
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700">
                                        {recipe.difficulty}
                                    </span>
                                </div>
                            </div>

                            {isOwner && (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => navigate(`/edit/${recipe.id}`)}
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition flex items-center gap-2 text-sm"
                                    >
                                        <Edit3 size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteRecipe(recipe.id)}
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition flex items-center gap-2 text-sm"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            {recipe.description}
                        </p>

                        {/* Meta Information */}
                        <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2 bg-orange-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
                                <span className="font-medium">Author:</span>
                                <span>{recipe.author || "Unknown"}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-orange-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
                                <span className="font-medium">Category:</span>
                                <span className="capitalize">{recipe.category}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-orange-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
                                <Heart size={16} className="text-red-500" />
                                <span>{recipe.likes} likes</span>
                            </div>
                        </div>

                        {/* Ingredients and Instructions Grid */}
                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            {/* Ingredients Card */}
                            <div className="bg-orange-50 dark:bg-gray-700/30 p-6 rounded-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <Utensils className="text-orange-500" size={20} />
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        Ingredients
                                    </h3>
                                </div>
                                <ul className="space-y-3">
                                    {recipe.ingredients?.map((ingredient: any, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="inline-block w-2 h-2 mt-2.5 rounded-full bg-orange-500 flex-shrink-0"></span>
                                            <div>
                                                <span className="text-gray-700 dark:text-gray-300">
                                                    {ingredient.amount} {ingredient.name}
                                                </span>
                                                {ingredient.note && (
                                                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                                                        {ingredient.note}
                                                    </span>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Instructions Card */}
                            <div className="bg-amber-50 dark:bg-gray-700/30 p-6 rounded-xl">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                    Cooking Instructions
                                </h3>
                                <ol className="space-y-4">
                                    {recipe.steps?.map((step: any, idx: number) => (
                                        <li key={idx} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0">
                                                    {step.number || idx + 1}
                                                </div>
                                                {idx < recipe.steps.length - 1 && (
                                                    <div className="w-0.5 h-full bg-orange-200 dark:bg-gray-600 my-1"></div>
                                                )}
                                            </div>
                                            <div className="pt-1">
                                                <p className="text-gray-700 dark:text-gray-300">{step.instruction}</p>
                                                {step.timer && (
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        ⏱️ {step.timer} {step.timerUnit}
                                                    </p>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        {/* Additional Sections */}
                        {recipe.tips && recipe.tips.length > 0 && (
                            <div className="bg-green-50 dark:bg-gray-700/30 p-6 rounded-xl">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                    <AlertTriangle size={20} className="text-green-500" />
                                    Chef's Tips
                                </h3>
                                <ul className="space-y-2">
                                    {recipe.tips.map((tip: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="inline-block w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0"></span>
                                            <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Nutrition Information */}
                        {recipe.nutrition && (
                            <div className="bg-blue-50 dark:bg-gray-700/30 p-6 rounded-xl">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                    Nutrition Information
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div className="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Calories</div>
                                        <div className="font-bold text-gray-800 dark:text-white">{recipe.nutrition.calories}</div>
                                    </div>
                                    <div className="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Protein</div>
                                        <div className="font-bold text-gray-800 dark:text-white">{recipe.nutrition.protein}</div>
                                    </div>
                                    <div className="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Carbs</div>
                                        <div className="font-bold text-gray-800 dark:text-white">{recipe.nutrition.carbs}</div>
                                    </div>
                                    <div className="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Fat</div>
                                        <div className="font-bold text-gray-800 dark:text-white">{recipe.nutrition.fat}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save to Favorites Button for Mobile */}
                        {user && (
                            <button
                                onClick={handleToggleFavorite}
                                className={clsx(
                                    "md:hidden mt-6 px-6 py-3 rounded-full font-medium transition duration-300 flex items-center justify-center gap-2 w-full",
                                    isSaved
                                        ? "bg-green-500 hover:bg-green-600 text-white"
                                        : "bg-orange-500 hover:bg-orange-600 text-white"
                                )}
                            >
                                <Heart
                                    size={20}
                                    className={clsx({
                                        "fill-white": isSaved,
                                        "fill-transparent": !isSaved,
                                    })}
                                />
                                {isSaved ? "Saved to Favorites" : "Save to Favorites"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailsPage;