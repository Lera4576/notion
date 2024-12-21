import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout } from '../redux/actions'; 
import { authenticateUser } from '../services/api'; 
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
});

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.isAuthenticated); 

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(logout()); 
            navigate('/login'); 
        }
    }, [isAuthenticated, dispatch, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        try {
            const validatedData = loginSchema.parse({ email, password });
            const user = await authenticateUser(validatedData.email, validatedData.password);
            dispatch(setUser(user)); 
            localStorage.setItem('user', JSON.stringify(user)); 
            navigate('/about'); 
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError(error.errors.map(err => err.message).join(', '));
            } else {
                setError(error.message); 
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center">Вход</h1>
                {error && <p className="text-red-500 text-center">{error}</p>} 
                <form onSubmit={handleSubmit} className="mt-6">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="mt-6 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                        Войти
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Нет аккаунта?{' '}
                    <Link to="/" className="text-blue-500 hover:underline">Зарегистрироваться</Link>
                </p>
            </div>   
        </div>
    );
};

export default Login;