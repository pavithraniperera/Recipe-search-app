import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Sun, Moon, LogOut, Plus, Search } from 'react-feather';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true' ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches &&
                !localStorage.getItem('darkMode'));
    });

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle dark mode toggle and persistence
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode]);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when navigating
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-sm' : 'bg-orange-500 dark:bg-gray-900'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            to="/home"
                            className="text-white dark:text-white text-2xl font-bold tracking-tight flex items-center"
                        >
                            <span className={`bg-orange-600 dark:bg-orange-700 p-2 rounded-lg mr-2 transition-all ${scrolled ? 'scale-90' : 'scale-100'}`}>
                                <span className="text-orange-200">🍳</span>
                            </span>
                            <span className={scrolled ? 'text-orange-600 dark:text-white' : 'text-white'}>
                                Recipe<span className="text-orange-200 dark:text-orange-400">Share</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <Link
                                to="/home"
                                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition ${location.pathname === '/home' ? 'bg-orange-600 text-white' : scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' : 'text-white hover:bg-orange-600'}`}
                            >
                                <Home size={16} className="mr-2" />
                                Home
                            </Link>
                            <Link
                                to="/profile"
                                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition ${location.pathname === '/profile' ? 'bg-orange-600 text-white' : scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' : 'text-white hover:bg-orange-600'}`}
                            >
                                <User size={16} className="mr-2" />
                                Profile
                            </Link>
                            <Link
                                to="/add-recipe"
                                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition ${scrolled ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-white text-orange-600 hover:bg-orange-100'}`}
                            >
                                <Plus size={16} className="mr-2" />
                                Add Recipe
                            </Link>
                            <Link
                                to="/search"
                                className={`p-2 rounded-md transition ${scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' : 'text-white hover:bg-orange-600'}`}
                            >
                                <Search size={18} />
                            </Link>

                            {/* Dark Mode Toggle */}
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2 rounded-full transition ${scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' : 'text-white hover:bg-orange-600'}`}
                                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </button>

                            {/* User Dropdown */}
                            <div className="relative ml-2">
                                <button className="flex items-center text-sm rounded-full focus:outline-none">
                                    <img
                                        className="h-8 w-8 rounded-full border-2 border-orange-300"
                                        src="/assets/Profile.jpg"
                                        alt="User profile"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className={`p-2 rounded-md focus:outline-none transition ${scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' : 'text-white hover:bg-orange-600'}`}
                            aria-expanded={menuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {menuOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link
                        to="/home"
                        className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${location.pathname === '/home' ? 'bg-orange-600 text-white' : scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' : 'text-white hover:bg-orange-600'}`}
                    >
                        <Home size={16} className="mr-2" />
                        Home
                    </Link>
                    <Link
                        to="/profile"
                        className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${location.pathname === '/profile' ? 'bg-orange-600 text-white' : scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' : 'text-white hover:bg-orange-600'}`}
                    >
                        <User size={16} className="mr-2" />
                        Profile
                    </Link>
                    <Link
                        to="/add-recipe"
                        className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${scrolled ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-white text-orange-600 hover:bg-orange-100'}`}
                    >
                        <Plus size={16} className="mr-2" />
                        Add Recipe
                    </Link>
                    <div className="flex items-center justify-between px-3 py-2">
                        <span className="text-sm font-medium flex items-center">
                            {darkMode ? <Sun size={16} className="mr-2" /> : <Moon size={16} className="mr-2" />}
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </span>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${darkMode ? 'bg-orange-500' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>
                    <button
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
                    >
                        <LogOut size={16} className="mr-2" />
                        Sign out
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;