// utils/favoriteUtils.ts
export const getFavorites = () => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
};

export const addFavorite = (userId: string, recipeId: number) => {
    const favorites = getFavorites();
    const exists = favorites.some(
        (fav: { userId: string; recipeId: number }) =>
            fav.userId === userId && fav.recipeId === recipeId
    );
    if (!exists) {
        favorites.push({ userId, recipeId });
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
};

export const removeFavorite = (userId: string, recipeId: number) => {
    const favorites = getFavorites().filter(
        (fav: { userId: string; recipeId: number }) =>
            !(fav.userId === userId && fav.recipeId === recipeId)
    );
    localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const isFavorite = (userId: string, recipeId: number): boolean => {
    const favorites = getFavorites();
    return favorites.some(
        (fav: { userId: string; recipeId: number }) =>
            fav.userId === userId && fav.recipeId === recipeId
    );
};
