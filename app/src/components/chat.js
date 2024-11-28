import React, { useState, useEffect } from "react";

const Chat = ({ username }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080');
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log("Connexion WebSocket ouverte");
        };

        newSocket.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.action === 'SERVER_MSG') {
                console.log("Message reçu du serveur :", msg.data);
                setNewMessage(msg.data);
            }
        };

        newSocket.onclose = () => {
            console.log("Connexion WebSocket fermée");
        };

        newSocket.onerror = (error) => {
            console.error("Erreur WebSocket :", error);
        };

        return () => {
            newSocket.close();
        };
    }, []);

    function setNewMessage(msg) {
        setMessages((prevMessages) => [
            ...prevMessages,
            msg
        ]);
    }

    function sendMessage(e) {
        e.preventDefault();
        const msg = {
            username,
            text
        };
        console.log("Envoi du message au serveur :", msg);
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ action: 'CLIENT_MSG', data: msg }));
            setText('');
        } else {
            console.error("La connexion WebSocket n'est pas ouverte");
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">Discussion</div>
                            <hr/>
                            <div className="messages">
                                {messages.map((msg, index) => (
                                    <div key={index}>{msg.username} : {msg.text}</div>
                                ))}
                            </div>
                        </div>
                        <form onSubmit={sendMessage}>
                            <div className="card-footer">
                                <input
                                    id="text"
                                    type="text"
                                    placeholder="Votre message"
                                    className="form-control"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                                <br/>
                                <button type="submit" className="btn btn-primary form-control">
                                    envoyer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;