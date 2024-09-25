import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { Payload } from "../../interfaces/Payload";

type AuthWrapperProps = {
  children: ReactNode;
};

export default function AuthWrapper(props: AuthWrapperProps) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("7git-token"));
  const [status, setStatus] = useState<boolean | "loading">();
  const [payload, setPayload] = useState<Payload>();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token) as Payload;
        if (decoded.id && decoded.login && decoded.avatar_url) {
          setPayload(decoded);
          setStatus(true);
          const params = new URLSearchParams(window.location.search);
          if (params.has("code")) {
            window.history.pushState({}, document.title, "/");
          }
        }
      } catch (e) {
        console.log("[AUTH] Invalid Token");
      }
    }
  }, [token]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      setStatus("loading");
      fetch(`${import.meta.env.VITE_7GIT_BACKEND_URL}/v1/auth/github`, {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((parsed) => {
          setStatus(undefined);
          if (parsed.token) {
            localStorage.setItem("7git-token", parsed.token);
            setToken(parsed.token);
          }
        })
        .catch(() => {
          setStatus(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        payload,
        status,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
