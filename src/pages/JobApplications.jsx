import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/applications/my-applications');
      setApplications(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch applications.');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'reviewed':
        return 'status-reviewed';
      case 'shortlisted':
        return 'status-shortlisted';
      case 'accepted':
        return 'status-accepted';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  if (loading) return <div className="loading">Loading applications...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="applications-page">
      <div className="applications-container">
        <h1>My Job Applications</h1>
        
        {applications.length === 0 ? (
          <div className="no-applications">
            <p>You haven't applied to any jobs yet.</p>
            <Link to="/jobs" className="btn btn-primary">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map((application) => (
              <div key={application._id} className="application-card">
                <div className="application-header">
                  <h3>{application.job.title}</h3>
                  <span className={`status-badge ${getStatusBadgeClass(application.status)}`}>
                    {application.status}
                  </span>
                </div>
                <div className="application-body">
                  <p className="company"><strong>{application.job.company}</strong></p>
                  <p className="location">📍 {application.job.location}</p>
                  <p className="type">🏷️ {application.job.type}</p>
                  <p className="applied-date">
                    Applied on {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="application-footer">
                  <Link to={`/jobs/${application.job._id}`} className="btn btn-secondary">
                    View Job
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplications;
