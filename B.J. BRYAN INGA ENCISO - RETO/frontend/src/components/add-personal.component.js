import React, { Component } from "react";
import PersonalDataService from "../services/personal.service";

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
      fecha_de_nacimiento: "", 

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
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Personal añadido con exito!</h4>
            
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                required
                value={this.state.nombre}
                onChange={this.onChangePersonal}
                name="nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                className="form-control"
                id="apellidos"
                required
                value={this.state.apellidos}
                onChange={this.onChangeApellidos}
                name="apellidos"
              />
            </div>

            <div className="form-group">
              <label htmlFor="edad">Edad</label>
              <input
                type="text"
                className="form-control"
                id="edad"
                required
                value={this.state.edad}
                onChange={this.onChangeEdad}
                name="edad"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fecha_de_nacimiento">Fecha de nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="fecha_de_nacimiento"
                required
                value={this.state.fecha_de_nacimiento}
                onChange={this.onChangeFecha_de_nacimiento}
                name="fecha_de_nacimiento"
              />
            </div>

            <button onClick={this.savePersonal} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
