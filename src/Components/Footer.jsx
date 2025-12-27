import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <footer className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-4xl">💼</span>
                            <h3 className="text-2xl font-bold">Elite Jobs</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            🌟 Your gateway to elite career opportunities. Connect with top companies and unlock your potential.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition">🐦</a>
                            <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition">🔗</a>
                            <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition">📷</a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">📋 Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                                    <span>🏠</span> Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/jobs" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                                    <span>🔍</span> Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link to="/add-job" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                                    <span>➕</span> Post a Job
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-applications" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                                    <span>📄</span> My Applications
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">📧 Contact Us</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex items-start gap-2">
                                <span>✉️</span>
                                <span>info@elitejobs.com</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>📞</span>
                                <span>+1 (234) 567-8900</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>📍</span>
                                <span>123 Elite Street,<br />Career City, USA</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/20 mt-10 pt-8 text-center">
                    <p className="text-gray-300 text-sm">
                        © {new Date().getFullYear()} <span className="font-bold text-white">Elite Jobs</span>. All rights reserved. Made with ❤️
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
