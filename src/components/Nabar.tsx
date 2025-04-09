import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Handle dark mode toggle
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-orange-500 dark:bg-gray-900 shadow-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/home" className="text-white text-2xl font-extrabold tracking-wide">
                    Recipe<span className="text-orange-200">Share</span>
                </Link>

                {/* Hamburger Icon */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/home" className="text-white hover:underline text-lg">Home</Link>
                    <Link to="/profile" className="text-white hover:underline text-lg">Profile</Link>

                    {/* Dark Mode Toggle */}
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        <div className="w-11 h-6 bg-white dark:bg-gray-700 rounded-full relative transition">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-orange-500 rounded-full transition-transform duration-300 transform peer-checked:translate-x-5"></div>
                        </div>
                        <span className="ml-2 text-white">{darkMode ? '🌙' : '☀️'}</span>
                    </label>

                    {/* Logout Button */}
                    <button className="bg-white text-orange-600 font-semibold px-4 py-2 rounded-md hover:bg-orange-100 transition">
                        Logout
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3">
                    <Link to="/home" className="block text-white hover:underline text-lg">Home</Link>
                    <Link to="/profile" className="block text-white hover:underline text-lg">Profile</Link>

                    {/* Dark Mode Toggle */}
                    <label className="flex items-center mt-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        <div className="w-11 h-6 bg-white dark:bg-gray-700 rounded-full relative transition">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-orange-500 rounded-full transition-transform duration-300 transform peer-checked:translate-x-5"></div>
                        </div>
                        <span className="ml-2 text-white">{darkMode ? '🌙' : '☀️'}</span>
                    </label>

                    <button className="w-full bg-white text-orange-600 font-semibold px-4 py-2 rounded-md hover:bg-orange-100 transition">
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
