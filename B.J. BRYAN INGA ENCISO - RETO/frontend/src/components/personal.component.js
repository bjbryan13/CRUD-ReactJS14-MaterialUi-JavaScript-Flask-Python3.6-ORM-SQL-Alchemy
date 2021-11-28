import React, { Component } from "react";
import PersonalDataService from "../services/personal.service";
import { Button, TextField } from "@material-ui/core";

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
            <h4>Actualizando datos del personal</h4>
            <form>
              <div className="form-group">
              
              <TextField
              margin="normal"
              fullWidth 
          required
          id="nombre"
          label="Nombre"
          defaultValue="nombre"
          variant="outlined"
          value={currentPersonal.nombre}
          onChange={this.onChangenombre}
          />
              </div>
              <div className="form-group">
                
              <TextField
              fullWidth 
            required
            id="apellidos"
            label="Apellidos"
            defaultValue="apellidos"
            variant="outlined"
            value={currentPersonal.apellidos}
                  onChange={this.onChangeapellidos}
                />
              </div>

              <div className="form-group">
              <TextField
            fullWidth 
          required
          id="edad"
          label="Edad"
          variant="outlined"
                  value={currentPersonal.edad}
                  onChange={this.onChangeEdad}
                />
              </div>

              
              <div className="form-group">
              <TextField
            fullWidth 
          required
          id="fecha_de_nacimiento" 
          label="Fecha de nacimiento "
          variant="outlined"
          type="date"
                  value={currentPersonal.fecha_de_nacimiento}
                  onChange={this.onChangefecha_de_nacimiento}
                />
              </div>

            </form>
            
            <Button 
            fullWidth
          color="primary"
          variant="contained"
              onClick={this.updatePersonal}
            >
              Actualizar
            </Button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Porfavor clickea para actualizar este personal...</p>
          </div>
        )}
      </div>
    );
  }
}
