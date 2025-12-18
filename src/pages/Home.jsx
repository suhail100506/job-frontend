import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Job</h1>
          <p>Discover thousands of job opportunities with all the information you need.</p>
          <div className="hero-buttons">
            {user ? (
              <Link to="/jobs" className="btn btn-primary btn-large">
                Browse Jobs
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-large">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-secondary btn-large">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Easy Job Search</h3>
            <p>Find jobs that match your skills and interests quickly and easily.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Top Companies</h3>
            <p>Connect with leading employers and startups in various industries.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Career Growth</h3>
            <p>Access opportunities that help you advance your professional career.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Job Alerts</h3>
            <p>Get notified about new job postings that match your profile.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of job seekers and employers today!</p>
        {!user && (
          <Link to="/register" className="btn btn-primary btn-large">
            Create Free Account
          </Link>
        )}
      </section>
    </div>
  );
};

export default Home;
