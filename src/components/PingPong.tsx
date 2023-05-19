import React, { useEffect, useState } from 'react';

function MyComponent() {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    window.electron.ipcRenderer.sendMessage('ping-pong', ['pingPong']);
  };

  useEffect(() => {
    const handleIpcMessage = (args) => {
      console.log(args);
    };

    window.electron.ipcRenderer.on('ping-pong', handleIpcMessage);
  }, []);

  return (
    <div>
      <h1>My Component</h1>
      <button type="button" onClick={handleSendMessage}>
        Send IPC Message
      </button>
      <p>Message: {message}</p>
    </div>
  );
}

export default MyComponent;
