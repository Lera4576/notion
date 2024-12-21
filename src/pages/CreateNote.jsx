import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { createNote } from '../services/api'; 
import { setNotes } from '../redux/actions'; 

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user); 
    const dispatch = useDispatch(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            setError('Пользователь не авторизован. Пожалуйста, войдите в систему.');
            return;
        }

        const newNote = {
            title,
            description,
            userId: currentUser.id,
            createdAt: new Date().toISOString(),
        };

        try {
            const createdNote = await createNote(newNote); 
            dispatch(setNotes(prevNotes => [...prevNotes, createdNote])); 
            navigate('/view-notes'); 
        } catch (error) {
            setError('Ошибка при создании заметки: ' + error.message);
        }
    };

    return (
        <div className="container mx-auto p-6 mt-24">
            <h1 className="text-3xl font-bold mb-6">Создать заметку</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-4">
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border border-gray-300 p-2 w-full mb-4 rounded"
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="border border-gray-300 p-2 w-full mb-4 rounded"
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Сохранить заметку
                </button>
            </form>
            <Link to="/notes">
                <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition">
                    Назад
                </button>
            </Link>
        </div>
    );
};

export default CreateNote;