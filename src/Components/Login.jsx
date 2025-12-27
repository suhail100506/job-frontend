import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 py-12 px-4">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <div className="text-5xl mb-4">💼</div>
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Sign in to continue your journey</p>
                </div>
                {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">📧 Email</label>
                        <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">🔒 Password</label>
                        <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" required />
                    </div>
                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold shadow-lg transform hover:scale-105">Sign In →</button>
                </form>
                <p className="text-center mt-6 text-sm text-gray-600">
                    New here? <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold">Create Account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;