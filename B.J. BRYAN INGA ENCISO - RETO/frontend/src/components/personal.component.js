import React, { Component } from "react";
import PersonalDataService from "../services/personal.service";

export default class Personal extends Component {
  constructor(props) {
    super(props);
    this.onChangenombre = this.onChangenombre.bind(this);
    this.onChangeapellidos = this.onChangeapellidos.bind(this);
    this.onChangeEdad = this.onChangeEdad.bind(this);
    this.onChangefecha_de_nacimiento = this.onChangefecha_de_nacimiento.bind(this);
    this.getPersonal = this.getPersonal.bind(this);
    this.updatePersonal = this.updatePersonal.bind(this);

    this.state = {
      currentPersonal: {
        id: null,
        nombre: "",
        apellidos: "",
        edad: "",
        fecha_de_nacimiento: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPersonal(this.props.match.params.id);
  }

  onChangenombre(e) {
    const nombre = e.target.value;
    this.setState(function(prevState) {
      return {
        currentPersonal: {
          ...prevState.currentPersonal,
          nombre: nombre
        }
      };
    });
  }

  onChangeapellidos(e) {
    const apellidos = e.target.value;
    this.setState(function(prevState) {
      return {
        currentPersonal: {
          ...prevState.currentPersonal,
          apellidos: apellidos
        }
      };
    });
  }

  onChangeEdad(e) {
    const edad = e.target.value;
    this.setState(function(prevState) {
      return {
        currentPersonal: {
          ...prevState.currentPersonal,
          edad: edad
        }
      };
    });
  }
  
  onChangefecha_de_nacimiento(e) {
    const fecha_de_nacimiento = e.target.value;
    
    this.setState(prevState => ({
      currentPersonal: {
        ...prevState.currentPersonal,
        fecha_de_nacimiento: fecha_de_nacimiento
      }
    }));
  }
  
  
  getPersonal(id) {
    PersonalDataService.getId(id)
      .then(response => {
        this.setState({
          currentPersonal: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePersonal() {
    PersonalDataService.update(
      this.state.currentPersonal.id,
      this.state.currentPersonal
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Personal modificado satisfactoriamente!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPersonal } = this.state;

    return (
      <div>
        {currentPersonal ? (
          <div className="edit-form">
            <h4>Personal</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nombre">nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={currentPersonal.nombre}
                  onChange={this.onChangenombre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellidos">apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellidos"
                  value={currentPersonal.apellidos}
                  onChange={this.onChangeapellidos}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edad">Edad: </label>
                <input
                  type="text"
                  className="form-control"
                  id="edad"
                  value={currentPersonal.edad}
                  onChange={this.onChangeEdad}
                />
              </div>

              
              <div className="form-group">
                <label htmlFor="fecha_de_nacimiento">Fecha de nacimiento: </label>
                <input
                  type="date"
                  className="form-control"
                  id="fecha_de_nacimiento"
                  value={currentPersonal.fecha_de_nacimiento}
                  onChange={this.onChangefecha_de_nacimiento}
                />
              </div>

            </form>
            
            
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePersonal}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Personal...</p>
          </div>
        )}
      </div>
    );
  }
}
