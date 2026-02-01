import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MeetingRoom from "./pages/MeetingRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/meeting-room" element={<MeetingRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
