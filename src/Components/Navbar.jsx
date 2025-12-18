import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Job Portal
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/jobs" className="navbar-link">Jobs</Link>
          </li>
          {user ? (
            <>
              <li className="navbar-item">
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
              </li>
              {(user.role === 'employer' || user.role === 'admin') && (
                <li className="navbar-item">
                  <Link to="/post-job" className="navbar-link">Post Job</Link>
                </li>
              )}
              <li className="navbar-item">
                <Link to="/my-applications" className="navbar-link">My Applications</Link>
              </li>
              <li className="navbar-item">
                <span className="navbar-user">Welcome, {user.name}</span>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="btn btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
