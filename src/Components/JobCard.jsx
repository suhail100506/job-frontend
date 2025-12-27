import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    const daysAgo = Math.floor((new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24));
    const timeAgo = daysAgo === 0 ? '✨ New' : daysAgo === 1 ? 'Yesterday' : `${daysAgo}d ago`;
    const typeColors = { 
        'Full-time': 'from-green-500 to-emerald-600', 
        'Part-time': 'from-blue-500 to-cyan-600', 
        'Contract': 'from-purple-500 to-pink-600', 
        'Internship': 'from-yellow-500 to-orange-600', 
        'Remote': 'from-indigo-500 to-purple-600' 
    };
    const color = typeColors[job.type] || 'from-indigo-500 to-purple-600';

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2 group">
            <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between mb-4">
                    <div className="flex-1">
                        <Link to={`/jobs/${job._id}`}>
                            <h3 className="text-2xl font-bold text-gray-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 mb-2 transition">
                                {job.title}
                            </h3>
                        </Link>
                        <p className="font-semibold text-lg text-gray-700 flex items-center gap-2">
                            <span className="text-2xl">🏢</span> {job.company}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${color} text-white shadow-md`}>
                            {job.type}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{timeAgo}</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3 mb-4 text-sm">
                    <span className="flex items-center gap-1 text-gray-600 bg-gray-50 px-3 py-1 rounded-lg">
                        <span>📍</span> {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600 bg-gray-50 px-3 py-1 rounded-lg">
                        <span>🏷️</span> {job.category}
                    </span>
                </div>
                {job.salary && (
                    <div className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 inline-block">
                        <span className="text-green-700 font-bold text-lg">💰 {job.salary}</span>
                    </div>
                )}
            </div>
            <div className="p-6">
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">{job.description}</p>
                {job.requirements && (
                    <p className="text-gray-500 text-xs line-clamp-2 mb-3 italic">
                        📋 {job.requirements}
                    </p>
                )}
                {job.postedBy && (
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        <span>👤</span> Posted by {job.postedBy.name || 'Recruiter'}
                    </p>
                )}
            </div>
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-indigo-50 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                    <span>📅</span> {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <Link 
                    to={`/jobs/${job._id}`} 
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition transform group-hover:scale-105"
                >
                    View Details →
                </Link>
            </div>
        </div>
    );
};

export default JobCard;
