import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchNoteById, updateNote } from '../services/api'; 
import { setNotes } from '../redux/actions'; 

const EditNote = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useSelector((state) => state.user); 
    const notes = useSelector((state) => state.notes); 
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const note = await fetchNoteById(id);
                setTitle(note.title);
                setDescription(note.description);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNote();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedNote = {
            id, 
            title,
            description,
            userId: currentUser.id, 
            updatedAt: new Date().toISOString(),
        };

        try {
            await updateNote(id, updatedNote); 
            const updatedNotes = notes.map(note => note.id === id ? updatedNote : note);
            dispatch(setNotes(updatedNotes)); 

            navigate('/view-notes', { state: { note: updatedNote } });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6 mt-24">
            <h1 className="text-3xl font-bold mb-6">Редактировать заметку</h1>
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
                    Сохранить изменения
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

export default EditNote;