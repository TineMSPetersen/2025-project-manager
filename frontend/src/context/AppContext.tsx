import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IAppContextType } from "../types";

export const AppContext = createContext<IAppContextType>({
  backendUrl: "",
  token: "",
  setToken: () => {},
  navigate: () => {},
});

const AppContextProvider = (props: { children: React.ReactNode }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const value = {
    backendUrl,
    token,
    setToken,
    navigate,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
