import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export function AppProvider({ children, value }) {
  const [drawerOpen, setDrowerOpen] = useState(false);
  const [medicaments, setMedicaments] = useState([])
  return (
    <AppContext.Provider
      value={{
        drawerOpen,
        setDrowerOpen,
        setMedicaments,
        medicaments,
        ...value,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppStore = () => useContext(AppContext);
