import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>{job.title}</h3>
        <span className="job-type">{job.type}</span>
      </div>
      <div className="job-card-body">
        <p className="company"><strong>{job.company}</strong></p>
        <p className="location">📍 {job.location}</p>
        <p className="category">🏷️ {job.category}</p>
        {job.salary && <p className="salary">💰 {job.salary}</p>}
        <p className="description">{job.description.substring(0, 150)}...</p>
      </div>
      <div className="job-card-footer">
        <Link to={`/jobs/${job._id}`} className="btn btn-primary">
          View Details
        </Link>
        <span className="posted-date">
          {new Date(job.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
