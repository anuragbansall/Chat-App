import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Room from "./Components/Room";
import Chat from "./Components/Chat";

const socket = io("http://localhost:4000");

const App = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    socket.on("newMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  const joinRoom = () => {
    if (username && roomName) {
      socket.emit("joinRoom", { room: roomName });
      setIsJoined(true);
    }
  };

  const sendMessage = () => {
    if (username && message && roomName) {
      socket.emit("newMessage", { username, message, room: roomName });
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#1E1E1E] text-white p-8">
      <h1 className="text-4xl text-center">Chat App</h1>

      {!isJoined ? (
        <div className="flex-grow flex justify-center items-center">
          <Room
            username={username}
            setUsername={setUsername}
            roomName={roomName}
            setRoomName={setRoomName}
            joinRoom={joinRoom}
          />
        </div>
      ) : (
        <div className="h-[80vh]">
          <Chat
            messages={messages}
            message={message}
            sendMessage={sendMessage}
            setMessage={setMessage}
            username={username}
          />
        </div>
      )}
    </div>
  );
};

export default App;
