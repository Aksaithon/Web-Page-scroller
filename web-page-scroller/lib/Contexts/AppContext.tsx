import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<string>("");

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState<string>("Hello Context!");

  return (
    <AppContext.Provider value={{ value, setValue }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
