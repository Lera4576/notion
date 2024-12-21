import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/actions';

const About = ({ currentUser, setUser }) => {
    const navigate = useNavigate(); 

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && !currentUser) {
            setUser(JSON.parse(storedUser)); 
        }
    }, [currentUser, setUser]);

    const handleCreateNote = () => {
        navigate('/notes'); 
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center">Информация о пользователе</h1>
                {currentUser ? (
                    <div className="mt-6">
                        <p className="text-lg">Email: <span className="font-medium">{currentUser.email}</span></p>
                        <p className="text-lg">Время регистрации: <span className="font-medium">{new Date(currentUser.registrationTime).toLocaleString()}</span></p>
                        <button 
                            onClick={handleCreateNote} 
                            className="mt-4 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Создать заметку
                        </button>
                    </div>
                ) : (
                    <p className="mt-4 text-red-500">Пользователь не авторизован.</p>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.user,
});

const mapDispatchToProps = {
    setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(About);