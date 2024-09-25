import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import SevenGitLogo from "../assets/7git-logo.svg";
import "./NavBar.css";

export default function NavBar() {
  const { status, payload } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="title">
        <div className="logo">
          <img src={SevenGitLogo} />
        </div>
        <p>7GIT</p>
      </div>
      {status === true && (
        <div className="user">
          <p>{payload?.login}</p>
          <div className="avatar">
            <img src={payload?.avatar_url} />
          </div>
        </div>
      )}
    </div>
  );
}
