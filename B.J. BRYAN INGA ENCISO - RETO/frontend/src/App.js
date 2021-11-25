import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPersonal from "./components/add-personal.component";
import Personal from "./components/personal.component";
import PersonalList from "./components/personal-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/Personal"} className="navbar-brand">
            B.J. Bryan Inga Enciso
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Personal"} className="nav-link">
                Personal
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add_new_personal"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/Personal"]} component={PersonalList} />
            <Route exact path="/add_new_personal" component={AddPersonal} />
            <Route path="/update_personal_details/:id" component={Personal} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
