import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions'; 

const Navbar = () => {
    const navigate = useNavigate(); 
    const location = useLocation();
    const isAuthenticated = useSelector((state) => !!state.user); 
    const dispatch = useDispatch(); 

    const handleLogout = () => {
        dispatch(logout()); 
        localStorage.removeItem('user'); 
        navigate('/login'); 
    };

    const handleLoginClick = () => {
        if (isAuthenticated) {
            handleLogout(); 
        } else {
            navigate('/login'); 
        }
    };

    if (location.pathname === '/login' || location.pathname === '/') {
        return null; 
    }

    return (
        <nav className="fixed top-0 left-0 w-full p-4 bg-gray-800 text-white shadow-md z-50">
            <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link to="/about" className="hover:underline">About</Link>
                    <Link to="/notes" className="hover:underline">Notes</Link>
                    {isAuthenticated ? (
                        <button 
                            onClick={handleLogout} 
                            className="hover:underline"
                        >
                            Logout
                        </button>
                    ) : (
                        <button 
                            onClick={handleLoginClick} 
                            className="hover:underline"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;