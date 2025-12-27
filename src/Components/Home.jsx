import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-white">
            <section className="container mx-auto px-4 py-24">
                <div className="text-center max-w-5xl mx-auto">
                    <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
                        🎉 Welcome to Elite Jobs Platform
                    </div>
                    <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 mb-6 leading-tight">
                        Find Your Dream Career
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
                        🚀 Discover thousands of opportunities with elite companies. 
                        <br className="hidden md:block" />
                        Connect with top employers and elevate your career journey.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        {user ? (
                            <Link
                                to="/jobs"
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition transform hover:scale-105"
                            >
                                🔍 Browse Elite Jobs
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition transform hover:scale-105"
                                >
                                    ✨ Get Started Free
                                </Link>
                                <Link
                                    to="/login"
                                    className="bg-white text-indigo-600 border-2 border-indigo-600 px-10 py-4 rounded-xl text-lg font-bold hover:bg-indigo-50 transition transform hover:scale-105 shadow-lg"
                                >
                                    🔑 Sign In
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-20">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
                    🏆 Why Choose Elite Jobs?
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100">
                        <div className="text-6xl mb-4">🎯</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Smart Search</h3>
                        <p className="text-gray-600 leading-relaxed">
                            AI-powered job matching to find perfect opportunities tailored to your skills.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100">
                        <div className="text-6xl mb-4">💼</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Top Companies</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Access exclusive opportunities from Fortune 500 companies and innovative startups.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100">
                        <div className="text-6xl mb-4">📈</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Career Growth</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Fast-track your professional development with roles that accelerate your success.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100">
                        <div className="text-6xl mb-4">⚡</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Instant Alerts</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Real-time notifications for new jobs matching your profile and preferences.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-20 my-16 rounded-3xl mx-4 shadow-2xl">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div className="transform hover:scale-110 transition">
                            <div className="text-5xl font-extrabold mb-3">10,000+</div>
                            <div className="text-xl text-indigo-100">💼 Active Jobs</div>
                        </div>
                        <div className="transform hover:scale-110 transition">
                            <div className="text-5xl font-extrabold mb-3">5,000+</div>
                            <div className="text-xl text-indigo-100">🏢 Elite Companies</div>
                        </div>
                        <div className="transform hover:scale-110 transition">
                            <div className="text-5xl font-extrabold mb-3">50,000+</div>
                            <div className="text-xl text-indigo-100">🎉 Success Stories</div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="container mx-auto px-4 py-24 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
                    Ready to Transform Your Career?
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Join elite professionals worldwide. Create your free account and unlock exclusive opportunities today!
                </p>
                {!user && (
                    <Link
                        to="/register"
                        className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-5 rounded-xl text-xl font-bold hover:shadow-2xl transition transform hover:scale-105"
                    >
                        🚀 Start Your Journey Free
                    </Link>
                )}
            </section>
        </div>
    );
};

export default Home;
