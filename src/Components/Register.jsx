import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'jobseeker' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register, user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(formData);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 py-12 px-4">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <div className="text-5xl mb-4">🌟</div>
                    <h2 className="text-3xl font-bold text-gray-800">Join Elite Jobs</h2>
                    <p className="text-gray-500 mt-2">Create your account in seconds</p>
                </div>
                {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">👤 Full Name</label>
                        <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">📧 Email</label>
                        <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">🔒 Password</label>
                        <input type="password" name="password" placeholder="Minimum 6 characters" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" required minLength="6" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">🎯 Role</label>
                        <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition">
                            <option value="jobseeker">🔍 Job Seeker</option>
                            <option value="recruiter">💼 Recruiter</option>
                        </select>
                    </div>
                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold shadow-lg transform hover:scale-105 mt-6">Create Account →</button>
                </form>
                <p className="text-center mt-6 text-sm text-gray-600">
                    Already registered? <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;