const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server is running on ws://localhost:8080');

// Handle connection events
wss.on('connection', (ws) => {
    console.log('A new client connected!');

    // Handle incoming messages from the client
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Send a response back to the client
        ws.send(`You said: ${message}`);
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});