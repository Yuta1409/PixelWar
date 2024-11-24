import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin(username);
    };

    return (
        <div className="login-container">
            <h2>Choisissez un Pseudo</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Pseudo:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <button type="submit">Valider</button>
            </form>
        </div>
    );
};

export default Login;