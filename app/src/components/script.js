import React, { useEffect, useRef, useState } from 'react';

const CanvasComponent = ({ color }) => {
    const canvasRef = useRef(null);
    const [pageId, setPageId] = useState(null);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        setPageId(Math.floor(Math.random() * 100));
        const socket = new WebSocket('ws://localhost:8080');
        setWs(socket);

        socket.onmessage = (event) => {
            const { action, data } = JSON.parse(event.data);
            const ctx = canvasRef.current.getContext('2d');
            if (action === 'draw') {
                ctx.fillStyle = data.color;
                ctx.fillRect(data.x, data.y, 10, 10);
            } else if (action === 'init') {
                Object.values(data).forEach(p => {
                    ctx.fillStyle = p.color;
                    ctx.fillRect(p.x, p.y, 10, 10);
                });
            }
        };

        socket.onclose = (event) => {
            console.log('WebSocket is closed: ', event.reason);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error: ', error);
        };

        return () => {
            socket.close();
        };
    }, []);

    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const id = `${x},${y}`;
        const pixelData = { action: 'draw', data: { id, x, y, color }, id: pageId }; // Utiliser la couleur passée en prop
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(pixelData));
        } else {
            console.error('WebSocket is not open: ', ws.readyState);
        }
    };

    return (
        <canvas
            ref={canvasRef}
            id="canvas"
            width={800}
            height={600}
            onClick={handleCanvasClick}
        />
    );
};

export default CanvasComponent;