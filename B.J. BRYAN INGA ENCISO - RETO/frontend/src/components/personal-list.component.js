import React, { Component } from "react";
import PersonalDataService from "../services/personal.service";
import { Button, List, ListItem, ListItemText } from "@material-ui/core";

export default class PersonalsList extends Component {
  constructor(props) {
    super(props);
    this.retrievePersonals = this.retrievePersonals.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePersonal = this.setActivePersonal.bind(this);
    this.deletePersonal = this.deletePersonal.bind(this);
    this.editPersonal = this.editPersonal.bind(this);

    this.state = {
      Personals: [],
      currentPersonal: null,
      currentIndex: -1,
    };
    
  }

  deletePersonal() {    
    PersonalDataService.delete(this.state.currentPersonal.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/personal')
        window.location.replace('/personal')
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  editPersonal() {    
        window.location.replace('/update_personal_details/'+this.state.currentPersonal.id)
    }

  
  componentDidMount() {
    this.retrievePersonals();
  }


  retrievePersonals() {
    PersonalDataService.getAll()
      .then(response => {
        this.setState({
          Personals: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePersonals();
    this.setState({
      currentPersonal: null,
      currentIndex: -1
    });
  }

  setActivePersonal(Personal, index) {
    this.setState({
      currentPersonal: Personal,
      currentIndex: index
    });
  }

  render() {
    const { Personals, currentPersonal } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h1>Lista de Personal</h1>
          <List >
          {Personals &&
              Personals.map((Personal, index) => (
          <ListItem button disablePadding onClick={() => this.setActivePersonal(Personal, index)}>
          <ListItemText  primary={Personal.nombre}  key={index}></ListItemText>
          </ListItem>
              ))}
          </List>

        </div>

        <div className="col-md-6">
          {currentPersonal ? (
            <div className="box">
            
           <br></br>
              <h4>Personal</h4>
           <br></br>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentPersonal.nombre}
              </div>
              <div>
                <label>
                  <strong>Apellidos:</strong>
                </label>{" "}
                {currentPersonal.apellidos}
              </div>
              <div>
                <label>
                  <strong>Edad:</strong>
                </label>{" "}
                {currentPersonal.edad}
              </div>
              <div>
                <label>
                  <strong>Fecha de nacimiento:</strong>
                </label>{" "}
                {currentPersonal.fecha_de_nacimiento}
              </div>
           <br></br>
              
            <Button              
          color="primary"
          variant="contained"
              onClick={this.editPersonal}
            >
              Editar
            </Button>

            <Button        
                style={{ left: 15}}
            color="secondary"
          variant="contained"
              onClick={this.deletePersonal}
            >
              Eliminar
            </Button>


            </div>
          ) : (
            <div>
              <br />
              <p>Porfavor clickea un Personal...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
