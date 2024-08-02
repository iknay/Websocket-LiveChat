const WebSocket = require("ws");

const server = new WebSocket.Server({
  port: 8081,
});

server.on("connection", (ws) => {
  console.log("Client connected");

  ws.send("Hello this is welcome!");

  ws.on("message", (message) => {
    ws.send(`Your message: ${message}`);
  });
});