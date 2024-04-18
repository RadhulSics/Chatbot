import React from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
  Avatar,
  InfoButton,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import icon from "../Assets/logo.png";



function ChatBoat() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessage] = useState([
    {
      message: "How can I help you today?",
      sender: "gpt",
      direction: "incoming",
    },
  ]);

  const handleSend = async (message) => {
    console.log(message);
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];

    setMessage(newMessages);
    setTyping(true);
    await processMessageToGpt([newMessage]);
  };

  async function processMessageToGpt(chatMessgaes) {
    let apiMessages = chatMessgaes.map((messageObject) => {
      let role = "";
      if (messageObject.sender == "gpt") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content: "Explain all concepts like professional.",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessage((prevMessages) => [
          ...prevMessages,
          {
            message: data.choices[0].message.content,
            sender: "gpt",
            direction: "incoming",
          },
        ]);
        setTyping(false);
      });
  }

  return (
    <div className="" style={{ position: "relative", height: "100vh" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              typing ? <TypingIndicator content="typing..." /> : null
            }
          >
            {messages.map((message, i) => {
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput
            attachButton={false}
            autoFocus={true}
            placeholder="Type"
            onSend={handleSend}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default ChatBoat;
