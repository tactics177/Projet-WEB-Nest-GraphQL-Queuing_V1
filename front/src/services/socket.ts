import { io } from "socket.io-client";

const socketUrl: string =
  process.env.REACT_APP_SOCKET_URL || "http://localhost:3000";
const socket = io(socketUrl);

socket.on("connect", () => {
  //console.log(`Connected: ${socket.id}`);
});

socket.on("newMessage", (message) => {
  //console.log('New message received:', message);
  // Update your state or UI with the new message
});

export default socket;
