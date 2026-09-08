import { useState, useEffect, useContext, createContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("");

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    const currTheme = localStorage.getItem("theme");
    if (currTheme != undefined) {
      document.documentElement.setAttribute("data-theme", currTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "black");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ changeTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
