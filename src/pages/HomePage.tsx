import {useMemo, useState} from "react";
import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";
import { RootState } from "../store/store.ts";
import { Search, Filter, Clock, Flame, Star, ChevronDown } from "lucide-react";

const HomePage = () => {
    const [sortBy, setSortBy] = useState("popular");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [isSortOpen, setIsSortOpen] = useState(false);

    const recipes = useSelector((state: RootState) => state.recipes.recipeList || []);

    // Filter and sort recipes
    const filteredRecipes = useMemo(() => {
        let result = [...recipes];

        // Search filter
        if (searchQuery) {
            result = result.filter(recipe =>
                recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Category filter
        if (activeFilter !== "all") {
            result = result.filter(recipe => recipe.category === activeFilter);
        }

        // Sorting
        switch (sortBy) {
            case "recent":
                return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            case "rating":
                return result.sort((a, b) => b.rating - a.rating);
            case "time":
                return result.sort((a, b) => parseInt(a.cookingTime) - parseInt(b.cookingTime));
            default:
                return result.sort((a, b) => b.likes - a.likes); // Popular
        }
    }, [recipes, searchQuery, activeFilter, sortBy]);

    const categories = [
        { id: "all", name: "All Recipes" },
        { id: "breakfast", name: "Breakfast" },
        { id: "lunch", name: "Lunch" },
        { id: "dinner", name: "Dinner" },
        { id: "dessert", name: "Dessert" },
        { id: "vegetarian", name: "Vegetarian" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 text-white py-24 px-4 text-center">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="relative max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Discover <span className="text-amber-200">Delicious</span> Recipes
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 mb-8">
                        Explore a world of flavors. Save your favorites, share your own, and cook with passion.
                    </p>

                    {/* Hero Search */}
                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search recipes, ingredients, chefs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-800"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Category Filters */}
                <div className="mb-10 overflow-x-auto">
                    <div className="flex space-x-3 pb-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveFilter(category.id)}
                                className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${activeFilter === category.id ? 'bg-orange-500 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sort and Results Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {searchQuery ? `Search Results for "${searchQuery}"` : "Featured Recipes"}
                        <span className="text-gray-500 text-lg ml-2">({filteredRecipes.length} recipes)</span>
                    </h2>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                            <Filter className="w-5 h-5 text-orange-500" />
                            <span className="font-medium">
                                {sortBy === "popular" ? "Popular" :
                                    sortBy === "recent" ? "Recent" :
                                        sortBy === "rating" ? "Top Rated" : "Quickest"}
                            </span>
                            <ChevronDown className={`w-5 h-5 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isSortOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-10 overflow-hidden">
                                <button
                                    onClick={() => {
                                        setSortBy("popular");
                                        setIsSortOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 flex items-center gap-2 ${sortBy === "popular" ? 'bg-orange-50 dark:bg-gray-700 text-orange-500' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    <Flame className="w-5 h-5" />
                                    Popular
                                </button>
                                <button
                                    onClick={() => {
                                        setSortBy("recent");
                                        setIsSortOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 flex items-center gap-2 ${sortBy === "recent" ? 'bg-orange-50 dark:bg-gray-700 text-orange-500' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    <Clock className="w-5 h-5" />
                                    Recent
                                </button>
                                <button
                                    onClick={() => {
                                        setSortBy("rating");
                                        setIsSortOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 flex items-center gap-2 ${sortBy === "rating" ? 'bg-orange-50 dark:bg-gray-700 text-orange-500' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    <Star className="w-5 h-5" />
                                    Top Rated
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recipe Grid */}
                {filteredRecipes.length > 0 ? (
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredRecipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                id={recipe.id}
                                title={recipe.title}
                                image={recipe.image}
                                description={recipe.description}
                                cookingTime={recipe.cookingTime}
                                rating={recipe.rating}
                                category={recipe.category}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-dashed border-gray-200 dark:border-gray-700">
                        <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                            No recipes found
                        </h3>
                        <p className="text-gray-500">
                            {searchQuery
                                ? "Try adjusting your search or filter to find what you're looking for"
                                : "There are currently no recipes available in this category"}
                        </p>
                    </div>
                )}

                {/* Load More Button */}
                {filteredRecipes.length > 0 && (
                    <div className="mt-12 text-center">
                        <button className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-orange-500 font-medium rounded-xl border border-orange-500 transition shadow-sm hover:shadow-md">
                            Load More Recipes
                        </button>
                    </div>
                )}
            </div>

            {/* Featured Categories Section */}
            <div className="bg-gray-50 dark:bg-gray-800/50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        Browse by Category
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.filter(c => c.id !== "all").map((category) => (
                            <div
                                key={category.id}
                                onClick={() => setActiveFilter(category.id)}
                                className={`p-6 rounded-xl cursor-pointer transition-all ${activeFilter === category.id ? 'bg-orange-500 text-white shadow-lg transform -translate-y-1' : 'bg-white dark:bg-gray-700 hover:shadow-md'}`}
                            >
                                <div className="text-center">
                                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${activeFilter === category.id ? 'bg-orange-400' : 'bg-orange-100 dark:bg-gray-600'}`}>
                                        <Flame className={`w-6 h-6 ${activeFilter === category.id ? 'text-white' : 'text-orange-500'}`} />
                                    </div>
                                    <h3 className="font-medium">{category.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;