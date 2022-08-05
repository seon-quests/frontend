import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/css/custom.css"

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import PlayerLayout from "layouts/Player.js";
import {PrivateRoute} from "./extensions/protectedRoutes";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
          <PrivateRoute path="/player" roles={['admin', 'player']} component={PlayerLayout} />
          <PrivateRoute path="/admin" roles={['admin']} component={AdminLayout} />
          <Route path="/auth" component={AuthLayout} />
          <Redirect exact from="/" to='/auth/login' />
          <Redirect from="*" to='/sorry' />
        </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
