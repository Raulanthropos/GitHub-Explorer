import { useState } from "react";
import { useGithubStore } from "../store/githubStore";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const setUsername = useGithubStore((state) => state.setUsername);
  const setError = useGithubStore((state) => state.setError);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) {
      setError("Please enter a username.");
      return;
    }

    setUsername(input.trim());
    setError(null);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex my-3">
      <div className="position-relative w-100 me-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter GitHub username..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input && (
          <span
            className="position-absolute end-0 top-50 translate-middle-y text-secondary pe-2 fs-5 user-select-none"
            onClick={() => setInput("")}
            role="button"
            tabIndex={0}
            aria-label="Clear search"
            style={{ cursor: "pointer" }}
          >
            ×
          </span>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
