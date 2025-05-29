import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <SearchBar />
        <Routes>
          <Route path="/" element={<Profile />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
