import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
      setJob(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch job details.');
      console.error('Error fetching job:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setApplying(true);
      const formData = new FormData();
      formData.append('jobId', id);
      formData.append('coverLetter', coverLetter);
      if (resume) {
        formData.append('resume', resume);
      }

      await axios.post('http://localhost:5000/api/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Application submitted successfully!');
      setCoverLetter('');
      setResume(null);
      navigate('/my-applications');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit application');
      console.error('Error submitting application:', err);
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="loading">Loading job details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!job) return <div className="error-message">Job not found</div>;

  return (
    <div className="job-details-page">
      <div className="job-details-container">
        <div className="job-header">
          <h1>{job.title}</h1>
          <div className="job-meta">
            <span className="company">{job.company}</span>
            <span className="location">📍 {job.location}</span>
            <span className="type">{job.type}</span>
            <span className="category">{job.category}</span>
          </div>
          {job.salary && <p className="salary">💰 {job.salary}</p>}
          <p className="posted-date">
            Posted on {new Date(job.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="job-content">
          <section className="job-section">
            <h2>Job Description</h2>
            <p>{job.description}</p>
          </section>

          <section className="job-section">
            <h2>Requirements</h2>
            <p>{job.requirements}</p>
          </section>
        </div>

        {user && user.role !== 'employer' && user.role !== 'admin' && (
          <div className="application-form">
            <h2>Apply for this Job</h2>
            <form onSubmit={handleApply}>
              <div className="form-group">
                <label htmlFor="coverLetter">Cover Letter *</label>
                <textarea
                  id="coverLetter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  required
                  rows="6"
                  placeholder="Explain why you're a great fit for this position..."
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label htmlFor="resume">Resume (PDF or DOC)</label>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={applying}>
                {applying ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        )}

        {!user && (
          <div className="login-prompt">
            <p>Please <a href="/login">login</a> to apply for this job.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
