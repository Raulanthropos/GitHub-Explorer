import SearchBar from "./components/SearchBar";
import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <SearchBar />
        <Routes>
          <Route path="/" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
