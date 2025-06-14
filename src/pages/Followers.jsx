import { useState } from "react";
import { useGithubStore } from "../store/githubStore";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import useFetchGithubData from "../hooks/useGitHubData";

const Followers = () => {
  const { username, followers, error, profile } = useGithubStore();
  useFetchGithubData("followers", username);

  const followersPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * followersPerPage;
  const endIndex = startIndex + followersPerPage;
  const paginatedFollowers = followers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(followers.length / followersPerPage);

  if (!username) {
    return (
      <h4 className="text-center mt-5">
        Please enter a GitHub username above to view followers.
      </h4>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-5 text-center" role="alert">
        {error}
      </div>
    );
  }

  if (followers.length === 0) {
    return <Spinner />;
  }

  return (
    <div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="text-center mb-3" style={{ marginTop: "100px" }}>
        <h1>Followers {profile?.followers ? `(${profile.followers})` : ""}</h1>
      </div>
      {paginatedFollowers.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 justify-content-center">
          {paginatedFollowers.map((follower) => (
            <div
              key={follower.id}
              className="col d-flex justify-content-center"
            >
              {" "}
              <div
                className="card h-100 w-100"
                style={{ minWidth: "300px", maxWidth: "400px" }}
              >
                <img
                  src={follower.avatar_url}
                  alt={follower.login}
                  className="card-img-top"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{follower.login}</h5>
                  <a
                    href={follower.html_url}
                    className="btn btn-sm btn-outline-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No followers found.</p>
      )}
      {followers.length > followersPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Followers;
