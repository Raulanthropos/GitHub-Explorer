import { useGithubStore } from "../store/githubStore";
import { useState } from "react";
import Spinner from "../components/Spinner";
import useFetchGithubData from "../hooks/useGitHubData";

const Profile = () => {
  const { username, profile, error } = useGithubStore();
  useFetchGithubData("profile", username);
  const [showFullBio, setShowFullBio] = useState(false);
  const isLongBio = profile?.bio && profile.bio.length > 50;
  const bioToDisplay =
    showFullBio || !isLongBio ? profile?.bio : `${profile.bio.slice(0, 50)}...`;

  if (!username) {
    return (
      <div className="text-center mt-5">
        <h4>Please enter a GitHub username above to view profile info.</h4>
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

  if (!profile) {
    return <Spinner />;
  }

  return (
    <div className="mt-4">
      {error && <div className="alert ...">{error}</div>}
      {profile && (
        <div
          className="card p-3 mx-auto"
          style={{ minWidth: "300px", maxWidth: "400px" }}
        >
          <h1>Profile</h1>

          <img
            src={profile.avatar_url}
            alt={profile.name}
            className="img-fluid rounded mb-3 mx-auto"
            style={{ maxWidth: "150px" }}
          />
          <h2 className="h5 text-center">
            <strong>Name:</strong>
            {profile.name}
          </h2>
          <h2 className="h5 text-center">
            <strong>Username:</strong> {profile.login}
          </h2>

          <p className="text-break mb-1">
            <strong>Bio: </strong>
            {bioToDisplay || <em>No bio available.</em>}
          </p>

          {isLongBio && (
            <button
              className="btn btn-link p-0 mb-2"
              onClick={() => setShowFullBio(!showFullBio)}
            >
              {showFullBio ? "Show less" : "Show more"}
            </button>
          )}

          <p className="mb-1">
            <strong>Location:</strong> {profile.location || "N/A"}
          </p>
          <p className="mb-1">
            <strong>Repos:</strong> {profile.public_repos}
          </p>
          <p>
            <strong>Followers:</strong> {profile.followers}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
