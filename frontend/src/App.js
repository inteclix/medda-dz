import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { LinearProgress } from "@material-ui/core";

import Dashboard from "views/Dashboard";
import Others from "views/Others";

import useApi from "hooks/useApi";
import { AppProvider } from "stores";

const AppContainer = ({ children }) => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>{children}</BrowserRouter>
    </SnackbarProvider>
  </MuiPickersUtilsProvider>
);

function App() {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [user, setUser] = useState(null);
  const { api, token, setToken } = useApi();
  window.setToken = setToken
  useEffect(() => {
    setIsLoadingUser(true);
    api
      .get("/auth/me")
      .then(({ data }) => {
        setUser(data);
        setIsLoadingUser(false);
      })
      .catch(() => {
        setUser(null);
        setIsLoadingUser(false);
      });
  }, [token]);
  if (isLoadingUser) {
    return <LinearProgress />;
  }
  if (user) {
    return (
      <AppProvider value={{ user, api, setToken }}>
        <AppContainer>
          <Dashboard />
        </AppContainer>
      </AppProvider>
    );
  }
  return (
    <AppProvider value={{ user, api, setToken }}>
      <AppContainer>
        <Others />
      </AppContainer>
    </AppProvider>
  );
}

export default App;
