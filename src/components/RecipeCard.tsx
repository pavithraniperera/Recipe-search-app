import { Link } from "react-router-dom";
import { FC } from "react";

interface RecipeCardProps {
    id: number;
    title: string;
    image: string;
    cookingTime: string;
    rating: number;
}

const RecipeCard: FC<RecipeCardProps> = ({ id, title, image, cookingTime, rating }) => {
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={i <= Math.round(rating) ? "#F59E0B" : "#E5E7EB"}
                    className="w-5 h-5 inline-block"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.389-2.46a1 1 0 00-1.176 0l-3.389 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z" />
                </svg>
            );
        }
        return stars;
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-1">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">🕒 {cookingTime}</p>
                <div className="mb-2">{renderStars(rating)}</div>
                <Link
                    to={`/recipes/${id}`}
                    className="inline-block mt-2 text-sm text-orange-500 hover:underline font-medium"
                >
                    View Recipe →
                </Link>
            </div>
        </div>
    );
};

export default RecipeCard;
