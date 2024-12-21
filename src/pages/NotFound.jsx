import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

const NotFound = () => {
    const isAuthenticated = useSelector((state) => !!state.user); 

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-5xl font-bold text-red-600 mb-4">404 - Страница не найдена</h1>
            {isAuthenticated ? (
                <Link to="/about">
                    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">
                        Перейти на страницу About
                    </button>
                </Link>
            ) : (
                <Link to="/login">
                    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">
                        Перейти на страницу Вход
                    </button>
                </Link>
            )}
        </div>
    );
};

export default NotFound;