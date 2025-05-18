import { Link } from "react-router-dom";
import { FC } from "react";
import { Clock, Star, Heart, Eye } from "lucide-react";

interface RecipeCardProps {
    id: number;
    title: string;
    image: string;
    cookingTime: string;
    rating: number;
    category?: string;
    description?: string;
    likes?: number;
    views?: number;
}

const RecipeCard: FC<RecipeCardProps> = ({
                                             id,
                                             title,
                                             image,
                                             cookingTime,
                                             rating,
                                             category = "general",
                                             description = "",
                                             likes = 0,
                                             views = 0
                                         }) => {
    // Category color mapping
    const categoryColors: Record<string, string> = {
        breakfast: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        lunch: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        dinner: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        dessert: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
        vegetarian: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
        general: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    };

    return (
        <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
            {/* Image with overlay */}
            <div className="relative overflow-hidden h-48">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category badge */}
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${categoryColors[category]}`}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
                {/* Quick actions overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex space-x-2 w-full">
                        <button className="flex-1 flex items-center justify-center gap-1 bg-white/90 hover:bg-white text-gray-800 py-2 rounded-lg text-sm font-medium transition">
                            <Heart className="w-4 h-4" />
                            <span>{likes}</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1 bg-white/90 hover:bg-white text-gray-800 py-2 rounded-lg text-sm font-medium transition">
                            <Eye className="w-4 h-4" />
                            <span>{views}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Card content */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                        {title}
                    </h3>
                    <div className="flex items-center bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full text-xs font-medium">
                        <Clock className="w-3 h-3 mr-1" />
                        {cookingTime}
                    </div>
                </div>

                {description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {description}
                    </p>
                )}

                <div className="flex items-center justify-between mt-4">
                    {/* Rating */}
                    <div className="flex items-center">
                        <div className="flex mr-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-4 h-4 ${star <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {rating.toFixed(1)}
                        </span>
                    </div>

                    {/* View button */}
                    <Link
                        to={`/recipes/${id}`}
                        className="flex items-center text-sm font-medium text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                        View Recipe
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;