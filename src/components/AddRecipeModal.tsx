import { useState } from "react";
import { X, Clock, Star, List, ListOrdered, Image, Plus, ChefHat, Users, AlertTriangle, Bookmark } from "lucide-react";

const AddRecipeModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        cookingTime: "",
        prepTime: "",
        servings: 2,
        difficulty: "medium",
        rating: 3,
        category: "general",
        ingredients: "",
        steps: "",
        tips: "",
        variations: "",
        image: null,
        description: "",
        nutrition: {
            calories: "",
            protein: "",
            carbs: "",
            fat: ""
        }
    });

    const [preview, setPreview] = useState("");
    const [activeTab, setActiveTab] = useState("details");
    const [currentNutritionField, setCurrentNutritionField] = useState("calories");

    const categories = [
        "breakfast", "lunch", "dinner", "dessert",
        "vegetarian", "pasta", "grill", "japanese"
    ];

    const difficulties = ["easy", "medium", "hard"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNutritionChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            nutrition: {
                ...prev.nutrition,
                [name]: value
            }
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipeData = {
            ...formData,
            ingredients: formData.ingredients.split('\n')
                .filter(ing => ing.trim() !== '')
                .map(ing => ({ name: ing, amount: "", note: "" })), // Simplified for form
            steps: formData.steps.split('\n')
                .filter(step => step.trim() !== '')
                .map((step, idx) => ({
                    number: idx + 1,
                    instruction: step
                })),
            tips: formData.tips.split('\n').filter(tip => tip.trim() !== ''),
            variations: formData.variations.split('\n').filter(variation => variation.trim() !== ''),
            likes: 0, // Default values
            views: 0,
            createdAt: new Date().toISOString()
        };
        onSubmit(recipeData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-2xl max-h-[90vh] flex flex-col">
                {/* Modal Header */}
                <div className="relative">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-48 object-cover"
                        />
                    ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-orange-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                            <ChefHat className="w-16 h-16 text-orange-400 dark:text-orange-500" />
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition"
                    >
                        <X className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                    </button>
                </div>

                {/* Form Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        className={`flex-1 py-4 font-medium flex items-center justify-center gap-2 ${activeTab === 'details' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 dark:text-gray-400'}`}
                        onClick={() => setActiveTab('details')}
                    >
                        <List className="w-5 h-5" />
                        Details
                    </button>
                    <button
                        className={`flex-1 py-4 font-medium flex items-center justify-center gap-2 ${activeTab === 'ingredients' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 dark:text-gray-400'}`}
                        onClick={() => setActiveTab('ingredients')}
                    >
                        <ListOrdered className="w-5 h-5" />
                        Recipe
                    </button>
                    <button
                        className={`flex-1 py-4 font-medium flex items-center justify-center gap-2 ${activeTab === 'extras' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 dark:text-gray-400'}`}
                        onClick={() => setActiveTab('extras')}
                    >
                        <Bookmark className="w-5 h-5" />
                        Extras
                    </button>
                </div>
                <div className="overflow-y-auto flex-1">
                    <form onSubmit={handleSubmit} className="p-6">
                        {/* Details Tab */}
                        {activeTab === 'details' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Recipe Image
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex-1 cursor-pointer">
                                            <div
                                                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 hover:border-orange-400 transition flex flex-col items-center justify-center">
                                                <Image className="w-8 h-8 text-orange-400 mb-2"/>
                                                <span className="text-sm font-medium">Upload Image</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </div>
                                        </label>
                                        {preview && (
                                            <div className="flex-1">
                                                <div
                                                    className="h-24 w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                                    <img
                                                        src={preview}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Recipe Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Give your recipe a name"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe your recipe"
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Cooking Time
                                        </label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"/>
                                            <input
                                                type="text"
                                                name="cookingTime"
                                                value={formData.cookingTime}
                                                onChange={handleChange}
                                                placeholder="30 mins"
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Prep Time
                                        </label>
                                        <input
                                            type="text"
                                            name="prepTime"
                                            value={formData.prepTime}
                                            onChange={handleChange}
                                            placeholder="15 mins"
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Servings
                                        </label>
                                        <input
                                            type="number"
                                            name="servings"
                                            value={formData.servings}
                                            onChange={handleChange}
                                            min="1"
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Category
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                        >
                                            {categories.map(category => (
                                                <option key={category} value={category}>
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Difficulty
                                        </label>
                                        <select
                                            name="difficulty"
                                            value={formData.difficulty}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                        >
                                            {difficulties.map(difficulty => (
                                                <option key={difficulty} value={difficulty}>
                                                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Rating
                                    </label>
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setFormData(prev => ({...prev, rating: star}))}
                                                className={`w-9 h-9 rounded-full flex items-center justify-center transition ${formData.rating >= star ? 'bg-orange-100 text-orange-500' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}
                                            >
                                                <Star
                                                    className={`w-4 h-4 ${formData.rating >= star ? 'fill-current' : ''}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Ingredients/Steps Tab */}
                        {activeTab === 'ingredients' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Ingredients
                                    </label>
                                    <textarea
                                        name="ingredients"
                                        value={formData.ingredients}
                                        onChange={handleChange}
                                        placeholder={`2 cups flour\n1 tbsp salt\n3 cloves garlic, minced`}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent h-40 transition"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">Enter each ingredient on a new line</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Cooking Steps
                                    </label>
                                    <textarea
                                        name="steps"
                                        value={formData.steps}
                                        onChange={handleChange}
                                        placeholder={`1. Boil water in a large pot\n2. Add pasta and cook for 8 minutes\n3. Drain and set aside`}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent h-40 transition"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">Number each step for clarity</p>
                                </div>
                            </div>
                        )}

                        {/* Extras Tab */}
                        {activeTab === 'extras' && (
                            <div className="space-y-6">
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 text-green-500"/>
                                        Chef's Tips
                                    </label>
                                    <textarea
                                        name="tips"
                                        value={formData.tips}
                                        onChange={handleChange}
                                        placeholder={`Use fresh ingredients for best results\nLet the dish rest before serving`}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent h-32 transition"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">Enter each tip on a new line</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Variations
                                    </label>
                                    <textarea
                                        name="variations"
                                        value={formData.variations}
                                        onChange={handleChange}
                                        placeholder={`Add mushrooms for earthy flavor\nTry with chicken instead of beef`}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent h-32 transition"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">Enter each variation on a new line</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                        Nutrition Information (per serving)
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Calories</label>
                                            <input
                                                type="text"
                                                name="calories"
                                                value={formData.nutrition.calories}
                                                onChange={handleNutritionChange}
                                                placeholder="e.g. 350"
                                                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Protein</label>
                                            <input
                                                type="text"
                                                name="protein"
                                                value={formData.nutrition.protein}
                                                onChange={handleNutritionChange}
                                                placeholder="e.g. 25g"
                                                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Carbs</label>
                                            <input
                                                type="text"
                                                name="carbs"
                                                value={formData.nutrition.carbs}
                                                onChange={handleNutritionChange}
                                                placeholder="e.g. 45g"
                                                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Fat</label>
                                            <input
                                                type="text"
                                                name="fat"
                                                value={formData.nutrition.fat}
                                                onChange={handleNutritionChange}
                                                placeholder="e.g. 12g"
                                                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation & Submit */}
                        <div className="flex justify-between mt-8">
                            <button
                                type="button"
                                onClick={() => activeTab === 'details' ? onClose() : setActiveTab(activeTab === 'ingredients' ? 'details' : 'ingredients')}
                                className="px-6 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                {activeTab === 'details' ? 'Cancel' : 'Back'}
                            </button>

                            {activeTab !== 'extras' ? (
                                <button
                                    type="button"
                                    onClick={() => setActiveTab(activeTab === 'details' ? 'ingredients' : 'extras')}
                                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition flex items-center gap-2"
                                >
                                    Next
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition flex items-center gap-2"
                                >
                                    <Plus className="w-5 h-5"/>
                                    Create Recipe
                                </button>
                            )}
                        </div>
                    </form>
                </div>


            </div>
        </div>
    );
};

export default AddRecipeModal;