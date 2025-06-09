import { useState } from "react";
import { useGithubStore } from "../store/githubStore";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const setProfile = useGithubStore((state) => state.setProfile);
  const setRepos = useGithubStore((state) => state.setRepos);
  const setFollowers = useGithubStore((state) => state.setFollowers);
  const setUsername = useGithubStore((state) => state.setUsername);
  const setError = useGithubStore((state) => state.setError);
  const setSearchError = useGithubStore((state) => state.setSearchError);
  const searchError = useGithubStore((state) => state.searchError);
  const reset = useGithubStore((state) => state.reset);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.length < 3) {
      setSearchError(
        "Please write at least 3 characters to search for a username."
      );
      return;
    }
    if (!input.trim()) {
      setSearchError("Please enter a username.");
      return;
    }
    reset();
    setUsername(input.trim());
    setSearchError(null);

    const usernameTrimmed = input.trim();
    try {
      // Fetch profile
      const profileRes = await fetch(
        `https://api.github.com/users/${usernameTrimmed}`
      );
      const profileData = await profileRes.json();
      if (!profileRes.ok) throw new Error("Failed to fetch profile");
      setProfile(profileData);

      // Fetch repos
      const reposRes = await fetch(
        `https://api.github.com/users/${usernameTrimmed}/repos`
      );
      const reposData = await reposRes.json();
      if (!reposRes.ok) throw new Error("Failed to fetch repos");
      setRepos(reposData);

      // Fetch followers
      const followersRes = await fetch(
        `https://api.github.com/users/${usernameTrimmed}/followers`
      );
      const followersData = await followersRes.json();
      if (!followersRes.ok) throw new Error("Failed to fetch followers");
      setFollowers(followersData);

      setError(null);
    } catch (err) {
      setError(err.message);
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
        {searchError && (
          <div className="alert alert-danger mt-5 text-center" role="alert">
            {searchError}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
