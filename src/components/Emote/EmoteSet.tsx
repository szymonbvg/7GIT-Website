import { useContext, useEffect, useState } from "react";
import "./EmoteSet.css";
import Emote from "./Emote";
import { AuthContext } from "../../contexts/AuthContext";

type EmoteSetType = {
  name: string;
  emoteId: string;
}[];

type EmoteSetState = {
  modified: boolean;
  loading: boolean;
  status: boolean;
};

export default function EmoteSet() {
  const { payload, token } = useContext(AuthContext);
  const [emotes, setEmotes] = useState<EmoteSetType>([]);
  const [state, setState] = useState<EmoteSetState>({
    modified: false,
    loading: false,
    status: true,
  });

  const updateSet = () => {
    if (token && state.modified && !state.loading) {
      setState((prev) => {
        return {
          ...prev,
          loading: true,
        };
      });
      fetch(`${import.meta.env.VITE_7GIT_BACKEND_URL}/v1/emotes/update`, {
        method: "POST",
        body: JSON.stringify({ type: "set", data: emotes }),
        headers: { "Content-Type": "application/json", "X-Auth-Token": token },
      }).then((res) => {
        setState((prev) => {
          return {
            ...prev,
            loading: false,
            status: res.ok,
            modified: !res.ok,
          };
        });
      });
    }
  };

  const removeEmote = (id: string) => {
    if (!state.loading) {
      setEmotes((prev) => {
        return prev.filter((emote) => emote.emoteId !== id);
      });
      setState((prev) => {
        return {
          ...prev,
          modified: true,
        };
      });
    }
  };

  useEffect(() => {
    if (payload) {
      fetch(`${import.meta.env.VITE_7GIT_BACKEND_URL}/v1/emotes/${payload.login}`)
        .then((res) => res.json())
        .then((parsed) => {
          setEmotes(parsed.emotes);
        });
    }
  }, [payload]);

  return (
    <div className="emote-set-content">
      <div className="emote-set-container">
        <h3>EMOTES IN YOUR EMOTE SET:</h3>
        <div className="emote-set">
          {emotes.length > 0 ? (
            emotes.map((emote) => {
              return (
                <Emote key={emote.emoteId} handleRemove={removeEmote} id={emote.emoteId} name={emote.name} />
              );
            })
          ) : (
            <p>It looks like you don't have any emotes added</p>
          )}
        </div>
        <button onClick={updateSet} disabled={!state.modified || state.loading || !state.status}>
          {state.status ? (
            state.loading ? (
              <p>LOADING...</p>
            ) : (
              <p>SUBMIT</p>
            )
          ) : (
            <p style={{ color: "red" }}>SOMETHING WENT WRONG</p>
          )}
        </button>
      </div>
    </div>
  );
}
