import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import Home from "./components/home";
import auth from "./services/authService";

class App extends Component {
  state = {};
  componentWillMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/home"
            render={(props) => <Home {...props} user={user} />}
          />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/home" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}
export default App;
