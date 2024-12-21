import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from './redux/actions';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Notes from './pages/Notes';
import CreateNote from './pages/CreateNote'; 
import ViewNote from './pages/ViewNotes'; 
import EditNote from './pages/EditNote';
import NotFound from './pages/NotFound'; 
import Login from './pages/Login'; 
import Navbar from './components/Navbar';

const AppRoutes = ({ isAuthenticated, onLogout, onLogin, currentUser }) => {
    return (
        <>
            {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />}
            <Routes>
                <Route path="/" element={<SignUp onLogin={onLogin} />} />
                <Route path="/about" element={<About currentUser={currentUser} />} />
                <Route path="/notes" element={<Notes currentUser={currentUser} />} />
                <Route path="/create-note" element={<CreateNote currentUser={currentUser} />} />
                <Route path="/view-notes" element={<ViewNote />} />
                <Route path="/edit-note/:id" element={<EditNote />} />
                <Route path="/login" element={<Login onLogin={onLogin} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

const App = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => !!state.user); 
    const currentUser = useSelector((state) => state.user); 

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser))); 
        }
    }, [dispatch]);

    const handleLogin = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setUser(user)); 
    };

    const handleLogout = () => {
        localStorage.removeItem('user'); 
        dispatch(clearUser()); 
    };

    return (
        <Router>
            <AppRoutes 
                isAuthenticated={isAuthenticated} 
                onLogout={handleLogout} 
                onLogin={handleLogin} 
                currentUser={currentUser} 
            />
        </Router>
    );
};

export default App;

