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

      try {
        const url = endpoint
          ? `https://api.github.com/users/${username}/${endpoint}`
          : `https://api.github.com/users/${username}`;

        const res = await fetch(url);

        if (!res.ok) throw new Error(`Failed to fetch ${type}.`);
        const data = await res.json();

        switch (type) {
          case "followers":
            setFollowers(data);
            break;
          case "repos":
            setRepos(data);
            break;
          case "profile":
            setProfile(data);
            break;
        }

        setError(null);
      } catch (err) {
        setError(err.message);
        if (type === "followers") setFollowers([]);
        if (type === "repos") setRepos([]);
        if (type === "profile") setProfile(null);
      }
    };

    fetchData();
  }, [type, username, setFollowers, setRepos, setProfile, setError]);
};

export default useFetchGithubData;
