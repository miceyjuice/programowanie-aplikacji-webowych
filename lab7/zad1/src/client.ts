//@ts-nocheck

let socket = new WebSocket("ws://localhost:8080");

socket.onopen = (e) => {
  alert("Connected");
};

socket.onmessage = (data) => {
  let newData = JSON.parse(data.data).payload.message;
  let newListElement = document.createElement("li");
  newListElement.textContent = newData;
  document.getElementById("messages")?.appendChild(newListElement);
};

document.getElementById("send")?.addEventListener("click", () => {
  let message = (document.getElementById("msg") as HTMLInputElement).value;
  let messageObj = {
    type: "NEW_MESSAGE",
    payload: {
      author: "Pewau",
      message: message,
    },
  };
  socket.send(JSON.stringify(messageObj));
});
