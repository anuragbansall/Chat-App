import React, { useEffect, useRef } from 'react';

function Chat({ messages, message, sendMessage, setMessage, username }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='flex flex-col justify-between h-full md:px-12 gap-4'>
      <div className="flex flex-col gap-4 overflow-y-auto py-4 h-full">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.username === username ? "message msg-right" : "message msg-left"}
          >
            <span className='font-semibold capitalize'>{msg.username === username ? "You" : msg.username}:</span> {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="w-full flex flex-col sm:flex-row gap-4" onSubmit={(event) => event.preventDefault()}>
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input"
        />
        <button onClick={sendMessage} className="button flex-shrink-0">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Chat;
