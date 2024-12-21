const API_BASE_URL = 'http://localhost:5001'; 

const fetchAPI = async (endpoint, method = 'GET', body = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Ошибка при запросе: ${response.status}`);
    }

    return await response.json();
};

export const fetchUsers = async () => {
    return await fetchAPI('/users');
};

export const authenticateUser = async (email, password) => {
    const users = await fetchUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        throw new Error('Неверный email или пароль.'); 
    }
    
    return user; 
};

export const registerUser = async (newUser) => {
    return await fetchAPI('/users', 'POST', newUser);
};

export const fetchNotes = async () => {
    return await fetchAPI('/notes');
};

export const fetchNoteById = async (id) => {
    return await fetchAPI(`/notes/${id}`);
};

export const createNote = async (note) => {
    return await fetchAPI('/notes', 'POST', note);
};

export const updateNote = async (id, note) => {
    return await fetchAPI(`/notes/${id}`, 'PUT', note);
};

export const deleteNote = async (id) => {
    return await fetchAPI(`/notes/${id}`, 'DELETE');
};