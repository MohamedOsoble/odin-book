import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import * as API from "../api/user";

// components

// user context
const UserContext = createContext(null);

// user provider
function UserProvider(props) {
  const [currentUser, setCurrentUser] = useState(false); // user (or false if not logged in)
  const [isLoading, setIsLoading] = useState(true);

  // fetch user on mount
  useEffect(() => {
    // checks if user is logged in
    API.auth()
      .then(function (response) {
        if (response.data.user) {
          setCurrentUser(response.data.user);
          setIsLoading(false);
        } else {
          setCurrentUser(false);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setCurrentUser(false);
      });
  }, []); // run only once

  const login = useCallback(async (user) => {
    const response = await API.login(user);
    if (response.status === 200) {
      setCurrentUser(response.data.user);
    }
    return response;
  }, []);

  const logout = useCallback(() => {
    API.logout().then(function () {
      setCurrentUser(false);
    });
  }, []);

  // memo functions to optimise re-renders
  const contextValue = useMemo(
    () => ({
      currentUser,
      isLoading,
      login,
      logout,
    }),
    [currentUser, isLoading, login, logout],
  );

  return <UserContext.Provider value={contextValue} {...props} />;
}

// use user context hook
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser() must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
