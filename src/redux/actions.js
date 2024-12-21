export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const SET_NOTES = 'SET_NOTES'; 
export const LOGOUT = 'LOGOUT'; 

const someAsyncFunction = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(); 
        }, 1000);
    });
};

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const clearUser = () => ({
    type: CLEAR_USER,
});

export const setNotes = (notes) => ({
    type: SET_NOTES,
    payload: notes,
});

export const logout = () => ({
    type: LOGOUT,
});
export const handleLogout = () => {
    return async (dispatch) => {
        try {
            await someAsyncFunction(); 
            dispatch(clearUser()); 
            dispatch(logout()); 
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };
};