import * as http from "http";
import * as websocket from "ws";

const server = http.createServer();
const PORT = process.env.PORT || 8080;

const socket = new websocket.Server({ server });
socket.on("connection", function connection(ws) {
  ws.on("message", (data: any) => {
    let message;
    try {
      message = JSON.parse(data);
    } catch (e) {
      sendError(ws, "Zly format!");
      return;
    }
    if (message.type === "NEW_MOVE") {
      socket.clients.forEach((client) => {
        if (client.readyState === websocket.OPEN) {
          client.send(data);
        }
      });
    }
  });
});

const sendError = (ws: any, message: string) => {
  const messageObject = {
    type: "error",
    payload: message,
  };

  ws.send(JSON.stringify(messageObject));
};

server.listen(PORT);
