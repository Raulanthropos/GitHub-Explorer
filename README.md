# GitHub Explorer

A single-page application for browsing GitHub user information, built with React and Zustand.

## 🚀 Live Demo

[Github Explorer](https://git-hub-explorer-liard.vercel.app/)

## 🧾 Installation & Execution

1. Clone the repo:
   ```bash
   git clone https://github.com/Raulanthropos/github-explorer.git
   ```

2. Navigate into the project folder:
   ```bash
   cd github-explorer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app should now be running at `http://localhost:5173/`.

## ⚙️ Tech Stack & Key Decisions

- **React** – UI Library
- **Zustand** – Global state management (chosen over Redux for simplicity and less boilerplate)
- **React Router** – Client-side routing
- **Bootstrap 5** – Quick, responsive layout and styling
- **Custom Hook (useGitHubData)** – For DRY, centralized API calls and better structure

### Notable Trade-offs

#### Vite vs CRA

Chose Vite for speed, simplicity, and dev experience.

Trade-off: Less out-of-the-box tooling and opinionation compared to CRA.

#### Zustand vs Redux

Chose Zustand for simplicity and minimal setup.

Trade-off: fewer advanced features and ecosystem tooling.

#### One Hook for API Calls vs Granular Hooks per Page

Chose to centralize logic in one hook for maintainability.

Trade-off: less isolated component-level control.

## ⏱️ Time Spent

Estimated total: **10–12 hours**, spread over 5 days.

- Initial implementation: ~6 hours
- Hook refactoring + Zustand integration: ~3 hours
- UX & error handling polish: ~2–3 hours

## 📁 Project Structure

```
src/
├── components/         // UI components - Navbar, SearchBar, Spinner and Pagination
├── pages/              // Profile, Followers, Repositories
├── store/              // Zustand state store
├── hooks/              // useGitHubData (custom GitHub API hook)
└── App.jsx             // Main app structure and routing
```

## Notes

- GitHub's `/followers` endpoint does not include full name data — only `login`, `avatar_url`, and `html_url`.
- Displaying the follower's GitHub username (`login`) was the only viable and efficient option.
- No extra API calls were made per follower, to avoid rate limit issues and keep performance optimal.
- All API requests were made to GitHub’s public REST API at `https://api.github.com`, which provides free access to public user data.
- Refactor and hotfix branches were intentionally left in the repository to allow reviewers to track the development process and see each isolated change.

---
