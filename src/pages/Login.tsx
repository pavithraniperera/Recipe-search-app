import {
    Box,

    TextField,
    Typography,
    Container,
    Paper,
} from '@mui/material';

import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {useState} from "react";
import {loginSuccess} from "../features/auth/AuthSlice.ts";

export default function Login() {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = () => {
        dispatch(loginSuccess({ email, password }));

        // If login is successful, navigate to the dashboard
        navigate('/home');
    };

    return (
        <div className="flex min-h-screen font-sans">


            {/* Signup Form (left Side) */}
            <div className="flex flex-col justify-center w-full md:w-1/2 px-8">
                <Container maxWidth="sm">
                    <Paper elevation={4} className="p-8 rounded-3xl shadow-xl">
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                '& .MuiInputBase-root': {
                                    marginBottom: '2 rem',
                                },
                            }}
                            className="text-center font-bold text-orange-500 mb-[20px]"
                        >
                            Login to your Account
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
                                sx={{
                                    '& .MuiInputBase-root': {
                                        marginBottom: '1.75rem',
                                    },
                                }}
                                className="bg-white mt-7"
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                required
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    '& .MuiInputBase-root': {
                                        marginBottom: '1.75rem',
                                    },
                                }}
                                className="bg-white "
                            />
                            <button
                                onClick={handleLogin}
                                type="button"
                                className="w-full bg-orange-500 bg-opacity-30 backdrop-blur-md hover:bg-opacity-50 text-white font-bold py-3 rounded-xl shadow-md transition duration-300 ease-in-out"
                            >
                                Login
                            </button>


                            <Typography variant="body2" className="text-center text-gray-600 mt-4">
                                Don't you  have an account?{' '}
                                <Link to="/signup" className="text-orange-500 font-medium hover:underline">
                                    SignUp
                                </Link>
                            </Typography>
                        </Box>
                    </Paper>
                </Container>
            </div>

            {/* Hero Section (right Side) */}
            <div className="hidden md:flex w-1/2 bg-orange-50 items-center justify-center p-10">
                <div className="text-center">
                    <h2 className="text-5xl font-extrabold text-orange-600 mb-6 leading-tight">
                        🍳 Welcome to <span className="text-orange-500">RecipeShare</span>
                    </h2>
                    <p className="text-xl text-gray-700 mb-6 max-w-md mx-auto">
                        Discover, share, and save mouth-watering recipes from cooks around the world.
                    </p>
                    <img
                        src="src/assets/Chef-pana.svg"
                        alt="Chef Illustration"
                        className="mt-4 max-w-xs mx-auto"
                    />
                </div>
            </div>
        </div>

    );
}
