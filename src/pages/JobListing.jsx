import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    type: '',
    category: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/jobs');
      setJobs(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.keyword) queryParams.append('keyword', filters.keyword);
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.category) queryParams.append('category', filters.category);

      const response = await axios.get(
        `http://localhost:5000/api/jobs/search?${queryParams.toString()}`
      );
      setJobs(response.data);
      setError('');
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Error searching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFilters({ keyword: '', location: '', type: '', category: '' });
    fetchJobs();
  };

  if (loading) return <div className="loading">Loading jobs...</div>;

  return (
    <div className="job-listing-page">
      <div className="search-section">
        <h1>Find Your Next Job</h1>
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-grid">
            <input
              type="text"
              name="keyword"
              placeholder="Job title, keywords..."
              value={filters.keyword}
              onChange={handleFilterChange}
              className="form-input"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={handleFilterChange}
              className="form-input"
            />
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">All Categories</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Engineering">Engineering</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="search-buttons">
            <button type="submit" className="btn btn-primary">
              Search Jobs
            </button>
            <button type="button" onClick={handleReset} className="btn btn-secondary">
              Reset
            </button>
          </div>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="jobs-section">
        <h2>Available Jobs ({jobs.length})</h2>
        {jobs.length === 0 ? (
          <p className="no-jobs">No jobs found. Try adjusting your search criteria.</p>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListing;
