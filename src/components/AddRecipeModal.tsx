import { useState } from "react";

const AddRecipeModal = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [rating, setRating] = useState(1);
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipeData = {
            title,
            cookingTime,
            rating,
            ingredients,
            steps,
            image,
        };
        onSubmit(recipeData); // Pass data to parent component
        resetForm(); // Clear form after submit
    };

    const resetForm = () => {
        setTitle("");
        setCookingTime("");
        setRating(1);
        setIngredients("");
        setSteps("");
        setImage(null);
        setPreview("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[90%] max-w-lg shadow-lg relative">
                <button
                    className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Add New Recipe</h2>
                <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto max-h-[80vh]">
                    {/* Recipe Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Recipe Title</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Recipe Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white mt-2"
                        />
                    </div>

                    {/* Cooking Time */}
                    <div>
                        <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-700">Cooking Time</label>
                        <input
                            id="cookingTime"
                            type="text"
                            placeholder="e.g. 30 mins"
                            value={cookingTime}
                            onChange={(e) => setCookingTime(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white mt-2"
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                        <input
                            id="rating"
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                            min={1}
                            max={5}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white mt-2"
                        />
                    </div>

                    {/* Ingredients */}
                    <div>
                        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients</label>
                        <textarea
                            id="ingredients"
                            placeholder="List your ingredients here"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white mt-2 h-24"
                        />
                    </div>

                    {/* Steps */}
                    <div>
                        <label htmlFor="steps" className="block text-sm font-medium text-gray-700">Steps</label>
                        <textarea
                            id="steps"
                            placeholder="Describe the steps here"
                            value={steps}
                            onChange={(e) => setSteps(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white mt-2 h-24"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Recipe Image</label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full mt-2"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-md mt-4"
                            />
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition"
                    >
                        Submit Recipe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRecipeModal;
