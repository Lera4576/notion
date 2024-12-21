import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotes } from '../redux/actions'; 
import { fetchNotes, deleteNote as deleteNoteApi } from '../services/api'; 

const ViewNotes = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes);
    const note = notes.length > 0 ? notes[notes.length - 1] : null; 

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const data = await fetchNotes();
                if (data.length > 0) {
                    dispatch(setNotes(data)); 
                }
            } catch (error) {
                console.error('Ошибка при загрузке заметок:', error);
            }
        };

        loadNotes();
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            await deleteNoteApi(id);
            const updatedNotes = notes.filter(note => note.id !== id);
            dispatch(setNotes(updatedNotes));
            navigate('/notes');
        } catch (error) {
            console.error('Ошибка при удалении заметки:', error);
        }
    };

    const handleEdit = () => {
        if (note) {
            navigate(`/edit-note/${note.id}`, { state: { note } });
        }
    };

    return (
        <div className="container mx-auto p-6 mt-24">
            <h1 className="text-3xl font-bold mb-6">Последняя созданная заметка</h1>
            {note ? (
                <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                    <h2 className="text-xl font-semibold">{note.title}</h2>
                    <p className="text-gray-700 mt-2">{note.description}</p>
                    <div className="mt-4">
                        <button 
                            onClick={handleEdit} 
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition mr-2"
                        >
                            Редактировать
                        </button>
                        <button 
                            onClick={() => handleDelete(note.id)} 
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-700">Нет доступных заметок.</p>
            )}
            <div className="mt-4">
                {note && (
                    <Link to={{ pathname: `/edit-note/${note.id}`, state: { note } }}>
                        <button 
                            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition mr-2"
                        >
                            Назад
                        </button>
                    </Link>
                )}
                <button 
                    onClick={() => navigate('/notes')} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Перейти к списку всех заметок
                </button>
            </div>
        </div>
    );
};

export default ViewNotes;