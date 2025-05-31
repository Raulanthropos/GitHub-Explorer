import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Repositories from "./pages/Repositories";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <SearchBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/repos" element={<Repositories />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
