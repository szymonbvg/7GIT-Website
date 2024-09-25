import { createContext } from "react";
import { Payload } from "../interfaces/Payload";

type AuthContextType = {
  token: string | null;
  status?: boolean | "loading";
  payload?: Payload;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  status: false,
});
