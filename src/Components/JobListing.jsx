import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';
import API from '../utils/api';

const JobListing = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ keyword: '', location: '', type: '', category: '' });

    useEffect(() => { fetchJobs(); }, []);

    const fetchJobs = async () => {
        try { setLoading(true); const { data } = await API.get('/jobs'); setJobs(data); }
        catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams(Object.entries(filters).filter(([_, v]) => v));
        try { const { data } = await API.get(`/jobs/search?${params}`); setJobs(data); }
        catch (err) { console.error(err); }
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="text-xl">Loading...</div></div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-5xl">🔍</span>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Discover Elite Jobs</h1>
                    </div>
                    <form onSubmit={handleSearch} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input 
                            type="text" 
                            name="keyword" 
                            placeholder="💼 Job title or keyword..." 
                            value={filters.keyword} 
                            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })} 
                            className="px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition" 
                        />
                        <input 
                            type="text" 
                            name="location" 
                            placeholder="📍 City or location..." 
                            value={filters.location} 
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })} 
                            className="px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition" 
                        />
                        <select 
                            name="type" 
                            value={filters.type} 
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })} 
                            className="px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                        >
                            <option value="">🏷️ All Job Types</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Remote">Remote</option>
                        </select>
                        <select 
                            name="category" 
                            value={filters.category} 
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })} 
                            className="px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                        >
                            <option value="">📂 All Categories</option>
                            <option value="IT">IT</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                        </select>
                        <button 
                            type="submit" 
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-xl transition font-bold transform hover:scale-105"
                        >
                            🔍 Search Jobs
                        </button>
                        <button 
                            type="button" 
                            onClick={() => { setFilters({ keyword: '', location: '', type: '', category: '' }); fetchJobs(); }} 
                            className="bg-gray-100 hover:bg-gray-200 px-8 py-3 rounded-xl transition font-semibold"
                        >
                            ↻ Clear Filters
                        </button>
                    </form>
                </div>
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl">{jobs.length}</span>
                        <span>Elite Opportunities Found</span>
                    </h2>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                    {jobs.map(job => <JobCard key={job._id} job={job} />)}
                </div>
            </div>
        </div>
    );
};

export default JobListing;
