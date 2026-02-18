import { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";

const DataContext = createContext(null);

function DataProvider({ children }) {
  const [data, setData] = useState({});

  // get posts data
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      console.log("API Called...");
      const { data } = response;
      setData({ posts: data });
    });
  }, [data]); // run only once

  //memo functions to optimise re-renders
  // const contextValue = useMemo(
  //   () => ({
  //     data,
  //   }),
  //   [data],
  // );
  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
}

function getContext() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}

export { DataProvider, getContext };
