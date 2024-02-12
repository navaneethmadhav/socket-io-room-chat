import React from 'react'
import io from "socket.io-client";
import { useState } from "react";
import Chat from './Chat';
import '../Styles/Chat.css'

const socket = io.connect("http://localhost:3001");

const Socket = () => {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", { room, username });
            setShowChat(true);
        }
    };

    return (
        <div>
            <div className="login-container">
                {!showChat ? (
                    <div className="joinChatContainer">
                        <h3>Join A Chat</h3>
                        <input
                            type="text"
                            placeholder="John..."
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Room ID..."
                            onChange={(event) => {
                                setRoom(event.target.value);
                            }}
                        />
                        <button onClick={joinRoom}>Join A Room</button>
                    </div>
                ) : (
                    <Chat socket={socket} username={username} room={room} />
                )}
            </div>
        </div>
    )
}

export default Socket
