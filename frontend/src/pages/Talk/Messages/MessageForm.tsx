import React from 'react';
import "../Talk.css";

export const MessageForm = ({
  sendMessage,
}: {
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <div className="messageForm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(e);
          e.currentTarget.reset();
        }}
        className="input"
      >
        <textarea
          id="minput"
          placeholder="Message"
          className="message"
        ></textarea>
        <input
          type="submit"
          value="send"
          className="submit"
        ></input>
      </form>
    </div>
  );
};