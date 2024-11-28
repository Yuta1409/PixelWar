import React, { useState, useEffect } from 'react';
import './App.css';
import CanvasComponent from './components/script';
import Login from './components/login';
import Chat from './components/chat';

function App() {
    const [color, setColor] = useState('#000000');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            setIsLoggedIn(true);
        }
    }, []);

    const loginUser = (username) => {
        localStorage.setItem('username', username);
        setUsername(username);
        setIsLoggedIn(true);
    };

    const logoutUser = (username) => {
        localStorage.removeItem('username');
        setUsername('');
        setIsLoggedIn(false);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="text-3xl font-bold underline">Pixel War</h1>
                {isLoggedIn ? (
                    <>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="mt-4 p-2 border rounded"
                        />
                        <div className="mt-4 p-4 border-2 border-gray-300">
                            <CanvasComponent color={color} /> {/* Passer la couleur au composant */}
                        </div>
                        <div>
                            <Chat username={username} />
                        </div>
                        <button onClick={logoutUser}
                            className="mt-4 p-2 bg-red-500 text-white rounded">
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <Login onLogin={loginUser} />
                )}
            </header>
        </div>
    );
}

export default App;