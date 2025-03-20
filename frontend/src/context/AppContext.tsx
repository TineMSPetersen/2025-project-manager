import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AppContextType {
  backendUrl: string;
  token: string;
  setToken: (token: string) => void;
  navigate: (path: string, options?: object) => void;
}

export const AppContext = createContext<AppContextType>({
  backendUrl: "",
  token: "",
  setToken: () => {},
  navigate: () => {},
});

const AppContextProvider = (props: { children: React.ReactNode }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState<string>(localStorage.getItem('token') || ''); // Retrieve token from localStorage
  const navigate = useNavigate();

  // Effect to update token in localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token); // Persist token in localStorage
    }
  }, [token]); // Only runs when token changes

  const value = {
    backendUrl,
    token,
    setToken,
    navigate,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;