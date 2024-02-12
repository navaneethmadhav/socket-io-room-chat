import React, { useEffect, useState } from 'react'

const RoomDetails = ({ socket, username, room }) => {

    const [usersInRoom, setUsersInRoom] = useState([]);

    useEffect(() => {
        
        // Listen for update_users event to get the list of users in the room
        socket.on("update_users", (users) => {
            setUsersInRoom(users);
        });

        // // Cleanup function to remove the event listener
        // return () => {
        //     socket.off("update_users");
        // };
    }, [socket]);

  return (
    <div>
        <p>Username: {username}</p>
        <p>Room: {room}</p>
        <p>Users in Room:</p>
            <ul>
                {usersInRoom.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
    </div>
  )
}

export default RoomDetails
