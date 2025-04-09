import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: { username: string; email: string } | null;
}


// Helper function to get data from localStorage
const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const initialUser = getUserFromLocalStorage();

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: initialUser ? true : false,
        user: initialUser,
    },
    reducers: {
        signupSuccess: (state, action: PayloadAction<{ username: string; email: string; password: string }>) => {
            // Store user data in localStorage
            const { username, email, password } = action.payload;
            const user = { username, email, password };
            localStorage.setItem('user', JSON.stringify(user));

            state.isAuthenticated = true;
            state.user = { username, email };
        },
        loginSuccess: (state, action: PayloadAction<{ email: string; password: string }>) => {
            const storedUser = getUserFromLocalStorage();
            if (storedUser && storedUser.email === action.payload.email && storedUser.password === action.payload.password) {
                state.isAuthenticated = true;
                state.user = { username: storedUser.username, email: storedUser.email };
            }
        },
        logout: (state) => {
            localStorage.removeItem('user'); // Clear user data from localStorage
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { signupSuccess, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
