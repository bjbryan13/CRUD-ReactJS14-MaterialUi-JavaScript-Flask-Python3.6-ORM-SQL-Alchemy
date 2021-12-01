import React, { Component } from "react";
import PersonalDataService from "../services/personal.service";
import { Button, TextField } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';

export default class AddPersonal extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonal = this.onChangePersonal.bind(this);
    this.onChangeApellidos = this.onChangeApellidos.bind(this);
    this.onChangeEdad = this.onChangeEdad.bind(this);
    this.onChangeFecha_de_nacimiento = this.onChangeFecha_de_nacimiento.bind(this);
    this.savePersonal = this.savePersonal.bind(this);
    this.newPersonal = this.newPersonal.bind(this);

    this.state = {
      id: null,
      nombre: "",
      apellidos: "", 
      edad: "", 
      fecha_de_nacimiento: "1950-01-01", 

      submitted: false
    };
  }

  onChangePersonal(e) {
    this.setState({
      nombre: e.target.value
    });
  }

  onChangeApellidos(e) {
    this.setState({
      apellidos: e.target.value
    });
  }

  onChangeEdad(e) {
    this.setState({
      edad: e.target.value
    });
  }

  onChangeFecha_de_nacimiento(e) {
    this.setState({
      fecha_de_nacimiento: e.target.value
    });
  }

  savePersonal() {
    var data = {
      nombre: this.state.nombre,
      apellidos: this.state.apellidos,
      edad: this.state.edad,
      fecha_de_nacimiento: this.state.fecha_de_nacimiento
    };

    PersonalDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nombre: response.data.nombre,
          apellidos: response.data.apellidos,
          edad: response.data.edad,
          fecha_de_nacimiento: response.data.fecha_de_nacimiento,

          submitted: true
        });
        console.log(response.data);
        
        window.location.replace('/personal')
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPersonal() {
    this.setState({
      id: null,
      nombre: "",
      apellidos: "",
      edad: "",
      fecha_de_nacimiento: "",

      submitted: false
    });
  }

  render() {
    return (
      <div>
        {this.state.submitted ? (
          <div>
            <h4>Personal añadido con exito!</h4>
            
          </div>
        ) : (
          <div>
            <h2>Crea un nuevo personal</h2>

              <TextField
              margin="normal"
              fullWidth 
          required
          id="nombre"
          label="Nombre"
          defaultValue="nombre"
          variant="outlined"
          value={this.state.nombre}
          onChange={this.onChangePersonal}
              />
           <br></br>
             <br></br>
           
              <TextField
              fullWidth 
          required
          id="apellidos"
          label="Apellidos"
          defaultValue="apellidos"
          variant="outlined"
          value={this.state.apellidos}
          onChange={this.onChangeApellidos}
              />
              <br></br>
                <br></br>
           
            <TextField
            fullWidth 
          required
          id="edad"
          label="Edad"
          variant="outlined"
          type="number"
          value={this.state.edad}
          onChange={this.onChangeEdad}
              />
           
           <br></br>
             <br></br>
        <TextField
            fullWidth 
          required
          id="fecha_de_nacimiento" 
          label="Fecha de nacimiento "
          variant="outlined"
          type="date"
          value={this.state.fecha_de_nacimiento}
          onChange={this.onChangeFecha_de_nacimiento}
              />
              <br></br>
             <br></br>
           <br></br>
            <Button 
            fullWidth
          color="primary"
          variant="contained"
          onClick={this.savePersonal}>
              Guardar 
              <SaveIcon />
            </Button>
          </div>
        )}
      </div>
    );
  }
}
