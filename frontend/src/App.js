import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { LinearProgress } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import Dashboard from "views/Dashboard";
import Others from "views/Others";

import useApi from "hooks/useApi";
import { AppProvider } from "stores";
import ScrollToTopOnLocationChange from "components/ScrollToTopOnLocationChange";
import theme from "./theme";

const AppContainer = ({ children }) => (
  <ThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <SnackbarProvider maxSnack={1}>
        <BrowserRouter>
          <ScrollToTopOnLocationChange>{children}</ScrollToTopOnLocationChange>
        </BrowserRouter>
      </SnackbarProvider>
    </MuiPickersUtilsProvider>
  </ThemeProvider>
);

function App() {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [user, setUser] = useState(null);
  const { api, token, setToken } = useApi();
  window.api = api;
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
      <AppProvider value={{ user, setUser, api, setToken }}>
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
