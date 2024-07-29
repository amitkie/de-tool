import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import './Header.css';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, token, userInfo, error: loginError } = useSelector((state) => state.user);
  const userName = `${userInfo?.user?.first_name} ${userInfo?.user?.last_name}`;
  const userEmail = userInfo?.user?.email;
  console.log(userName);
  const userInitials = userName.split(' ').map(name => name[0]).join('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/');
  };


  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-logo">
          <img style={{scale:'1.2' , marginLeft:'1rem'}} src="../../images/kie_logo.JPG" alt="Header Logo" />
        </div>
        <nav className="header-nav">
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
          <NavLink to="/automate-flow" className={({ isActive }) => (isActive ? 'active-link' : '')}>Automate Flow</NavLink>
          <NavLink to="/airflow" className={({ isActive }) => (isActive ? 'active-link' : '')}>Airflow</NavLink>
          <NavLink to="/select-subscription" className={({ isActive }) => (isActive ? 'active-link' : '')}>Pricing</NavLink>
        </nav>
        <div className="user-info">
          <div className="user-icon" onClick={toggleDropdown}>
            <span className="user-initials">{userInitials}</span>
          </div>
          {isDropdownOpen && (
            <div className="user-dropdown">
              <div className="user-details">
                <span className="user-email">{userEmail}</span>
              </div>
              <div className="user-actions">
                <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active-link' : '')}>Profile</NavLink>
                <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active-link' : '')}>Settings</NavLink>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
