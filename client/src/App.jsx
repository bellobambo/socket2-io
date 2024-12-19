import React from "react";
import io from "socket.io-client";
import { useState, useEffect } from "react";
const socket = io.connect("http://localhost:5000");
import "./App.css";

const App = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", { message: inputMessage });
    setInputMessage("");
  };

  useEffect(() => {
    socket.on("new_message", (data) => {
      setMessage(data.message);
      console.log(data);
    });
  }, [socket]);

  return (
    <div>
      <h1>Chat App</h1>

      <form onSubmit={handleSubmit} action="">
        <input
          type="text"
          name="inputMessage"
          value={inputMessage}
          onChange={handleChange}
          placeholder="Enter Message"
        />
        <button type="submit">Send</button>
      </form>

      {message && <h2>{message}</h2>}
    </div>
  );
};

export default App;
