import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined'
import HomeOutlined from '@material-ui/icons/HomeOutlined'
import AddPersonal from "./components/add-personal.component";
import Personal from "./components/personal.component";
import PersonalList from "./components/personal-list.component";

class App extends Component {
  render() {
    return (
      <div>
        
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
          B.J. Bryan Inga Enciso
          </Typography>
      <br></br>
      <br></br>

          <Link to={"/Personal"} className="nav-link">
            Inicio 
            <HomeOutlined />
          </Link>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
          <Link to={"/add_new_personal"} className="nav-link">
                Add 
                <AddCircleOutlined/>
          </Link>
          
          </Toolbar>
      </AppBar>

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
