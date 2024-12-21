import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setNotes as setNotesAction } from '../redux/actions';
import { deleteNote as deleteNoteApi } from '../services/api'; 
import useNotes from '../hooks/useNotes';

const Notes = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user || JSON.parse(localStorage.getItem('user')));
    const notes = useSelector((state) => state.notes);
    const { loading } = useNotes(currentUser);

    const handleDelete = async (id) => {
        try {
            await deleteNoteApi(id); 
            dispatch(setNotesAction(notes.filter(note => note.id !== id))); 
        } catch (error) {
            console.error('Ошибка при удалении заметки:', error);
        }
    };

    if (loading) {
        return <p>Загрузка заметок...</p>; 
    }

    return (
        <div className="container mx-auto p-4 mt-24">
            <h1 className="text-3xl font-bold mb-4">Мои заметки</h1>
            <Link to="/create-note">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Создать заметку
                </button>
            </Link>
            {notes.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 mt-4">
                    {notes.map(note => (
                        <div key={note.id} className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-xl font-semibold">{note.title}</h2>
                            <p className="text-gray-800">{note.description}</p>
                            <p className="text-sm text-gray-500">
                                Дата: {note.updatedAt ? new Date(note.updatedAt).toLocaleString() : new Date(note.createdAt).toLocaleString()}
                            </p>
                            <div className="mt-2">
                                <Link to={`/edit-note/${note.id}`}>
                                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition mr-2">
                                        Редактировать
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleDelete(note.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="mt-4">Нет заметок для данного пользователя.</p>
            )}
        </div>
    );
};

export default Notes;