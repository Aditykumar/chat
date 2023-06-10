import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";
import ChatProvider from "./context/ChatProvider";

function App() {
  return (
    <div className="app">
      <ChatProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </ChatProvider>
    </div>
  );
}

export default App;
