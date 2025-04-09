import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useState } from "react";
import { Star } from "lucide-react";
import clsx from "clsx";

const RecipeDetailsPage = () => {
    const { id } = useParams();
    const recipe = useSelector((state) =>
        state.recipes.recipeList.find((r) => r.id === parseInt(id || "0"))
    );

    const [isSaved, setIsSaved] = useState(false);

    if (!recipe) {
        return (
            <div className="text-center mt-20 text-gray-600 dark:text-gray-300 text-lg">
                Recipe not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-orange-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-10">
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <img src={`/${recipe.image}`} alt={recipe.title} className="w-full h-80 object-cover" />

                <div className="p-6 space-y-4">
                    <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                        {recipe.title}
                    </h2>

                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Cooking Time: {recipe.cookingTime} mins</span>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                    key={i}
                                    size={18}
                                    className={clsx("transition", {
                                        "text-yellow-400 fill-yellow-400": i <= recipe.rating,
                                        "text-gray-300 dark:text-gray-600": i > recipe.rating,
                                    })}
                                />
                            ))}
                        </div>
                    </div>

                    <p className="text-base text-gray-700 dark:text-gray-200">{recipe.description}</p>

                    {/* Ingredients */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-orange-500">Ingredients</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            {recipe.ingredients?.map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Steps */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-orange-500">Instructions</h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                            {recipe.steps?.map((step: string, idx: number) => (
                                <li key={idx}>{step}</li>
                            ))}
                        </ol>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={() => setIsSaved(!isSaved)}
                        className={clsx(
                            "mt-6 px-6 py-2 rounded-full font-medium transition duration-300",
                            isSaved
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-orange-500 text-white hover:bg-orange-600"
                        )}
                    >
                        {isSaved ? "Saved to Favorites" : "Save to Favorites"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailsPage;
