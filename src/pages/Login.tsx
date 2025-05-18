import { Box, TextField, Typography, Container, Paper, Button, InputAdornment, IconButton, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginSuccess } from "../features/auth/AuthSlice.ts";
import { Visibility, VisibilityOff, Email, Lock, Google, Facebook, Apple } from '@mui/icons-material';
import { motion } from 'framer-motion';
import chefIllustration from '/assets/Chef-pana.svg';
// import foodPattern from '/assets/food-pattern.png';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            dispatch(loginSuccess({ email, password }));
            navigate('/home');
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="flex min-h-screen font-sans bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
            {/* Signup Form (left Side) */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center w-full md:w-1/2 px-4 sm:px-8 lg:px-16 py-12"
            >
                <Container maxWidth="sm">
                    <Paper
                        elevation={4}
                        className="p-8 rounded-3xl shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                        sx={{
                            //backgroundImage: `url(${foodPattern})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundBlendMode: 'overlay'
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h1"
                            className="text-center font-bold text-orange-600 dark:text-orange-400 mb-6"
                            gutterBottom
                        >
                            Welcome Back!
                        </Typography>

                        <Typography variant="body1" className="text-center text-gray-600 dark:text-gray-300 mb-8">
                            Sign in to access your recipes and cooking community
                        </Typography>

                        <Box component="form" noValidate autoComplete="off" className="space-y-5">
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                required
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email className="text-gray-500" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    marginBottom: '1.75rem',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                    }
                                }}
                                className="bg-white/50 dark:bg-gray-700/50"
                            />

                            <TextField
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                required
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock className="text-gray-500" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    marginBottom: '1.75rem',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                    }
                                }}
                                className="bg-white/50 dark:bg-gray-700/50"
                            />

                            <div className="flex justify-end mb-4">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    onClick={handleLogin}
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    disabled={isLoading}
                                    sx={{
                                        borderRadius: '12px',
                                        padding: '12px',
                                        backgroundColor: '#f97316',
                                        '&:hover': {
                                            backgroundColor: '#ea580c',
                                        },
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        fontWeight: '600'
                                    }}
                                    startIcon={isLoading ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    ) : null}
                                >
                                    {isLoading ? 'Signing In...' : 'Sign In'}
                                </Button>
                            </motion.div>

                            <Divider className="my-6" sx={{ '&::before, &::after': { borderColor: 'rgba(0, 0, 0, 0.12)' } }}>
                                <Typography variant="body2" className="text-gray-500 px-2">
                                    OR CONTINUE WITH
                                </Typography>
                            </Divider>

                            <div className="flex justify-center gap-4">
                                <IconButton
                                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    size="large"
                                >
                                    <Google className="text-red-500" />
                                </IconButton>
                                <IconButton
                                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    size="large"
                                >
                                    <Facebook className="text-blue-600" />
                                </IconButton>
                                <IconButton
                                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    size="large"
                                >
                                    <Apple />
                                </IconButton>
                            </div>

                            <Typography variant="body2" className="text-center text-gray-600 dark:text-gray-300 mt-6">
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="text-orange-600 dark:text-orange-400 font-medium hover:underline"
                                >
                                    Sign Up
                                </Link>
                            </Typography>
                        </Box>
                    </Paper>
                </Container>
            </motion.div>

            {/* Hero Section (right Side) */}
            <div className="hidden md:flex w-1/2 items-center justify-center p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-amber-500/10 dark:from-gray-800/50 dark:to-gray-900/50"></div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center relative z-10"
                >
                    <Typography
                        variant="h3"
                        className="font-extrabold text-orange-600 dark:text-orange-400 mb-6 leading-tight"
                        sx={{ fontSize: '2.5rem' }}
                    >
                        🍳 Welcome to <span className="text-orange-500 dark:text-orange-300">RecipeShare</span>
                    </Typography>
                    <Typography
                        variant="h6"
                        className="text-gray-700 dark:text-gray-300 mb-8 max-w-md mx-auto"
                        sx={{ fontSize: '1.25rem' }}
                    >
                        Join our community of food lovers and share your culinary creations
                    </Typography>
                    <motion.img
                        src={chefIllustration}
                        alt="Chef Illustration"
                        className="mt-4 max-w-md mx-auto"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    />
                    <div className="mt-8 flex justify-center gap-4">
                        {['Italian', 'Asian', 'Desserts', 'Vegan'].map((cuisine) => (
                            <motion.div
                                key={cuisine}
                                whileHover={{ y: -5 }}
                                className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow-sm text-sm font-medium text-orange-600 dark:text-orange-300"
                            >
                                #{cuisine}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}