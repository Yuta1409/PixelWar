const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const serveur = http.createServer(app);
const wss = new WebSocket.Server({ serveur });

let pixels = {};

wss.on('connection', (ws) => {
    console.log('Nouveau client connecté');

    ws.send(JSON.stringify({ action: 'init', data: pixels }));

    ws.on('message', (message) => {
        const { action, data, id } = JSON.parse(message);
        console.log('Message reçu:', action, data, id);

        if (action === 'draw') {
            pixels[data.id] = data;
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ action, data }));
                }
            });
        } else if (action === 'erase') {
            delete pixels[data.id];
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ action, data }));
                }
            });
        } else if (action === 'CLIENT_MSG') {
            console.log("Message reçu du client:", data);
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ action: 'SERVER_MSG', data }));
                }
            });
            console.log("Message diffusé à tous les clients:", data);
        }
    });

    ws.on('close', () => {
        console.log('Client déconnecté');
    });
});

serveur.listen(8080, () => {
    console.log('Le serveur écoute sur le port 8080');
});