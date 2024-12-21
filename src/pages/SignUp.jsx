import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions'; 
import { registerUser } from '../services/api'; 
import { z } from 'zod';

const signUpSchema = z.object({
    email: z.string().email('Некорректный email'),
    password: z.string()
        .min(8, 'Пароль должен содержать минимум 8 символов')
        .regex(/[A-ZА-Я]/, 'Пароль должен содержать хотя бы одну заглавную букву')
        .regex(/[a-zа-я]/, 'Пароль должен содержать хотя бы одну строчную букву')
        .regex(/\d/, 'Пароль должен содержать хотя бы одну цифру'),
    confirmPassword: z.string().min(1, 'Подтвердите пароль'),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
});

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setConfirmPasswordError('');
        setEmailError(''); 
        setErrorMessage('');

        try {
            const validatedData = signUpSchema.parse({ email, password, confirmPassword });

            const newUser = { 
                email: validatedData.email, 
                password: validatedData.password, 
                registrationTime: Date.now(), 
            };

            const user = await registerUser(newUser); 
            localStorage.setItem('user', JSON.stringify(user)); 
            dispatch(setUser(user)); 
            navigate('/about');
        } catch (error) {
            if (error instanceof z.ZodError) {
                error.errors.forEach(err => {
                    if (err.path[0] === 'email') {
                        setEmailError(err.message); 
                    }
                    if (err.path[0] === 'password') {
                        setPasswordError(err.message);
                    }
                    if (err.path[0] === 'confirmPassword') {
                        setConfirmPasswordError(err.message);
                    }
                });
            } else {
                setErrorMessage(error.message);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Регистрация</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(''); 
                    }}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                {emailError && <p className="text-red-500">{emailError}</p>} { }
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError('');
                    }}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                {passwordError && <p className="text-red-500">{passwordError}</p>}
                <input
                    type="password"
                    placeholder="Повторите пароль"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setConfirmPasswordError('');
                    }}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Зарегистрироваться
                </button>
            </form>
            <p className="mt-4 text-center">
                Уже зарегистрированы?{' '}
                <Link to="/login" className="text-blue-500 underline">Войдите в свой аккаунт</Link>
            </p>
        </div>
    );
};

export default SignUp;