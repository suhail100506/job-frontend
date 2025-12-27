import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) {
        return null;
    }

    return (
        <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl">💼</span>
                        <span className="text-xl font-bold text-white">Elite Jobs</span>
                    </Link>
                    <ul className="flex items-center space-x-6">
                        <li>
                            <Link to="/" className="text-white hover:text-gray-200 transition font-medium">Home</Link>
                        </li>
                        <li>
                            <Link to="/jobs" className="text-white hover:text-gray-200 transition font-medium">Jobs</Link>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <Link to="/dashboard" className="text-white hover:text-gray-200 transition font-medium">Dashboard</Link>
                                </li>
                                {(user.role === 'recruiter' || user.role === 'admin') && (
                                    <>
                                        <li>
                                            <Link to="/recruiter" className="text-white hover:text-gray-200 transition font-medium">Recruiter</Link>
                                        </li>
                                        <li>
                                            <Link to="/add-job" className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-semibold">+ Post Job</Link>
                                        </li>
                                    </>
                                )}
                                {user.role === 'admin' && (
                                    <li>
                                        <Link to="/admin" className="text-white hover:text-gray-200 transition font-medium">Admin</Link>
                                    </li>
                                )}
                                {user.role === 'jobseeker' && (
                                    <li>
                                        <Link to="/my-applications" className="text-white hover:text-gray-200 transition font-medium">Applications</Link>
                                    </li>
                                )}
                                <li>
                                    <span className="text-white bg-white/20 px-3 py-1 rounded-full text-sm">👋 {user.name}</span>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold">
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" className="text-white hover:text-gray-200 transition font-medium">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" className="bg-white text-indigo-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition font-semibold">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
