import { useEffect } from "react";
import { useGithubStore } from "../store/githubStore";
import { useState } from "react";

const Profile = () => {
  const { username, profile, setProfile, setError, error } = useGithubStore();
  const [showFullBio, setShowFullBio] = useState(false);
  const isLongBio = profile?.bio && profile.bio.length > 50;
  const bioToDisplay =
    showFullBio || !isLongBio ? profile?.bio : `${profile.bio.slice(0, 50)}...`;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) return;

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        if (!response.ok) throw new Error("User not found");

        const data = await response.json();
        console.log("This is the profile", data);
        setProfile(data);
        setError(null);
      } catch (err) {
        setProfile(null);
        setError(err.message);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {profile && (
        <div
          className="card p-3 mx-auto"
          style={{ maxWidth: "400px", minHeight: "400px" }}
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
