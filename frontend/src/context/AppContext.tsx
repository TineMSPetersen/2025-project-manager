import { createContext, useState } from "react";

interface AppContextType {
  backendUrl: string;
  token: string;
  setToken: (token: string) => void;
}

export const AppContext = createContext<AppContextType>({
  backendUrl: "",
  token: "",
  setToken: () => {},
});

const AppContextProvider = (props: { children: React.ReactNode }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [ token, setToken ] = useState("");

  const value = {
    backendUrl,
    token, setToken
  }

return (
  <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
);
}

export default AppContextProvider