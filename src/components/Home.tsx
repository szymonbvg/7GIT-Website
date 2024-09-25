import { useContext } from "react";
import GithubLoginButton from "./Auth/GithubLoginButton";
import "./Home.css";
import { AuthContext } from "../contexts/AuthContext";
import EmoteSet from "./Emote/EmoteSet";

function SevenTV() {
  return <a href="https://7tv.app">7TV</a>;
}

export default function Home() {
  const { status } = useContext(AuthContext);

  return (
    <div className="content">
      <div className="desc">
        <h3>
          {status !== true ? (
            <>
              Bring <SevenTV /> emotes to GitHub commits
            </>
          ) : (
            <>
              Go to <SevenTV /> and add some emotes
              <br />
              or remove them from Emote Set here
            </>
          )}
        </h3>
      </div>
      {!status ? (
        <div className="login-section">
          <GithubLoginButton />
          {status === false && <h3 style={{ color: "red" }}>SOMETHING WENT WRONG</h3>}
        </div>
      ) : (
        <>
          {status === "loading" && <h3>Loading...</h3>}
          {status === true && <EmoteSet />}
        </>
      )}
    </div>
  );
}
