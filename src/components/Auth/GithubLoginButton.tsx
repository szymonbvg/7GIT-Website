import "./GithubLoginButton.css";
import GithubLogo from "../../assets/github-logo.svg";

export default function GithubLoginButton() {
  const login = () => {
    window.location.href = `https://github.com/login/oauth/authorize?scope=user&client_id=${
      import.meta.env.VITE_GITHUB_CLIENT_ID
    }`;
  };

  return (
    <div className="github-login" onClick={login}>
      <img src={GithubLogo} />
      <p>Login with GitHub</p>
    </div>
  );
}
