import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotes as setNotesAction } from '../redux/actions';
import { fetchNotes } from '../services/api'; 

const useNotes = (currentUser) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const loadNotes = useCallback(async () => {
        if (!currentUser) {
            setLoading(false);
            return; 
        }

        try {
            const allNotes = await fetchNotes();
            const userNotes = allNotes.filter(note => note.userId === currentUser.id);
            userNotes.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
            dispatch(setNotesAction(userNotes)); 
        } catch (error) {
            console.error('Ошибка при загрузке заметок:', error);
        } finally {
            setLoading(false);
        }
    }, [currentUser, dispatch]);

    useEffect(() => {
        loadNotes();
    }, [loadNotes]);

    return { loading };
};

export default useNotes;