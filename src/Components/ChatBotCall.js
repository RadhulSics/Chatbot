import React from "react";
import ChatBotTitle from "./ChatBotTitle";
import ChatBoat from "./ChatBoat";

function ChatBotCall() {
  return (
    <div>
      <div className="row">
        <div className="Chatbot_head" >
          <ChatBotTitle />
        </div >
        <div className="Chatbot_content">
          <ChatBoat />
        </div>
      </div>
    </div>
  );
}

export default ChatBotCall;
