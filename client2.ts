import { io } from "socket.io-client";
const socket = io("http://localhost:3300");

socket.on("connect", () => {
  console.log(socket.connected); // true
});

socket.on("ping",(d)=>{
    console.log(d)
})