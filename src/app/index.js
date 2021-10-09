import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider, MuiThemeProvider } from "@material-ui/core/styles";
import { materialTheme } from "@assets/materialTheme";
import "./index.scss";
import React from "react";
import store from "@app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "@utils/components/PrivateRoute";
//#region redux
import BackdropSpin from "@components/common/BackdropSpin";
import SnackbarmaUI from "@components/common/Snackbar";
import Linear from "@components/common/Linear";
//#endregion
import routes from "./routes";

const App = () => {
  // prevent show warning on console browser
  console.warn = () => {};

  return (
    <React.Fragment>
      <MuiThemeProvider theme={materialTheme}>
        {/* This provider override css material-ui */}
        <StylesProvider injectFirst>
          {/* Redux store */}
          <Provider store={store}>
            <CssBaseline />
            <Linear />
            <BackdropSpin />
            <Router>
              <Switch>
                {routes.map((route, index) => {
                  if (route.public) {
                    return <Route key={index} {...route} />;
                  } else {
                    return <PrivateRoute key={index} {...route} />;
                  }
                })}
              </Switch>
            </Router>
            {/** Snackbar show message results */}
            <SnackbarmaUI />
          </Provider>
        </StylesProvider>
      </MuiThemeProvider>
    </React.Fragment>
  );
};

export default App;
