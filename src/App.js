import ChatBotCall from "./Components/ChatBotCall";
import "./Components/Chatbot.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<ChatBotCall />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
