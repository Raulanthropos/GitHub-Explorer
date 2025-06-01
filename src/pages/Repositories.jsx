import { useState } from "react";
import { useGithubStore } from "../store/githubStore";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Spinner from "../components/Spinner";
import useFetchGithubData from "../hooks/useGitHubData";

const Repositories = () => {
  const { username, repos, error } = useGithubStore();
  useFetchGithubData("repos", username);

  const [sortOrder, setSortOrder] = useState("desc");

  const sortedRepos = [...repos].sort((a, b) => {
    return sortOrder === "asc"
      ? a.stargazers_count - b.stargazers_count
      : b.stargazers_count - a.stargazers_count;
  });

  if (!username) {
    return (
      <div className="text-center mt-5">
        <h4>Please enter a GitHub username above to view repositories.</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-5 text-center" role="alert">
        {error}
      </div>
    );
  }

  if (repos.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="text-center" style={{ marginTop: "100px" }}>
      <h1 className="mb-3">Repositories</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {repos.length > 0 && (
        <>
          <div className="dropdown mb-3">
            <span>
              Sort by stars: <br />
            </span>
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="sortDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="sortDropdown">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSortOrder("asc")}
                >
                  Ascending
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSortOrder("desc")}
                >
                  Descending
                </button>
              </li>
            </ul>
          </div>

          <ul className="list-group">
            {sortedRepos.map((repo) => (
              <li key={repo.id} className="list-group-item">
                <h5 className="mb-1">{repo.name}</h5>
                <p className="mb-1">
                  {repo.description || <em>No description</em>}
                </p>
                <small>⭐ {repo.stargazers_count}</small>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Repositories;
