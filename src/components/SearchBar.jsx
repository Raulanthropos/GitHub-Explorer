import { useState } from "react";
import { useGithubStore } from "../store/githubStore";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const setUsername = useGithubStore((state) => state.setUsername);
  const setError = useGithubStore((state) => state.setError);
  const error = useGithubStore((state) => state.error);
  const navigate = useNavigate();
  const reset = useGithubStore((state) => state.reset);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length < 3) {
      setError("Please write at least 3 characters to search for a username.");
      return;
    } else {
      setUsername(input.trim());
      setError(null);
      navigate("/");
    }
    if (!input.trim()) {
      setError("Please enter a username.");
      return;
    }
  };

  return (
    <div
      className="bg-light shadow-sm"
      style={{
        position: "fixed",
        top: "56px",
        left: 0,
        width: "100vw",
        zIndex: 999,
      }}
    >
      <div
        className="d-flex justify-content-center flex-column align-items-center"
        style={{ maxWidth: "100vw" }}
      >
        <form
          onSubmit={handleSubmit}
          className="d-flex align-items-center"
          style={{ maxWidth: 500, width: "100%", margin: "0.5rem 0" }}
        >
          <div className="position-relative w-100">
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
                onClick={() => {
                  setInput("");
                  reset();
                }}
                role="button"
                tabIndex={0}
                aria-label="Clear search"
                style={{ cursor: "pointer" }}
              >
                ×
              </span>
            )}
          </div>
          <button className="btn btn-primary ms-2" type="submit">
            Search
          </button>
        </form>
        {error && (
          <div
            className="text-white bg-danger text-center mt-2 p-4"
            style={{ maxWidth: 500 }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
