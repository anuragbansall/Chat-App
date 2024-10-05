import React from 'react'

function Room({username, setUsername, roomName, setRoomName, joinRoom}) {
  return (
    <form className="flex flex-col gap-4 justify-center" onSubmit={(event) => event.preventDefault()}>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="input"
          />
          <button onClick={joinRoom} className="button">
            Join Room
          </button>
    </form>
  )
}

export default Room