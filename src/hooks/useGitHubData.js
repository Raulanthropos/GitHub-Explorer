import { useEffect } from "react";
import { useGithubStore } from "../store/githubStore";

const useFetchGithubData = (type, username) => {
  const { setFollowers, setRepos, setProfile, setError } = useGithubStore();

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      let endpoint = "";

      switch (type) {
        case "followers":
          endpoint = "followers";
          break;
        case "repos":
          endpoint = "repos";
          break;
        case "profile":
          endpoint = "";
          break;
        default:
          console.error("Invalid GitHub data type");
          return;
      }

      const url = endpoint
        ? `https://api.github.com/users/${username}/${endpoint}`
        : `https://api.github.com/users/${username}`;

      try {
        const res = await fetch(url);

        if (res.status === 404) {
          throw new Error("User not found.");
        }
        if (!res.ok) {
          throw new Error(`Failed to fetch ${type}.`);
        }

        const data = await res.json();

        if (type === "followers") setFollowers(data);
        else if (type === "repos") setRepos(data);
        else if (type === "profile") setProfile(data);

        setError(null);
      } catch (err) {
        setError(err.message);

        if (type === "followers") setFollowers([]);
        else if (type === "repos") setRepos([]);
        else if (type === "profile") setProfile(null);
      }
    };

    fetchData();
  }, [type, username, setFollowers, setRepos, setProfile, setError]);
};

export default useFetchGithubData;
