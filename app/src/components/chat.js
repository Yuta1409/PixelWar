import React, { useState, useEffect } from "react";

const socket = new WebSocket('ws://localhost:8080');

const Chat = ({ username }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        socket.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.action === 'SERVER_MSG') {
                console.log(msg.data);
                setNewMessage(msg.data);
            }
        };

        return () => {
            socket.close();
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
        console.log(msg);
        socket.send(JSON.stringify({ action: 'CLIENT_MSG', data: msg }));
        setText('');
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">My first chat</div>
                            <hr/>
                            <div className="messages">
                                {messages.map((msg, index) => (
                                    <div key={index}>{msg.username}: {msg.text}</div>
                                ))}
                            </div>
                        </div>
                        <form onSubmit={sendMessage}>
                            <div className="card-footer">
                                <input
                                    id="text"
                                    type="text"
                                    placeholder=""
                                    className="form-control"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                                <br/>
                                <button type="submit" className="btn btn-primary form-control">
                                    Envoyer
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