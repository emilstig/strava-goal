import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import "./App.scss";
import GA from "./helpers/googleAnalytics";
import theme from "./helpers/theme";

function App({ children }) {
  return (
    <BrowserRouter>
      {GA.init() && <GA.RouteTracker />}
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
