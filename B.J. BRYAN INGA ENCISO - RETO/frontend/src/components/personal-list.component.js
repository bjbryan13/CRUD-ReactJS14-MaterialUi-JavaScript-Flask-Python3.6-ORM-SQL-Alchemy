import React, { Component } from "react";
import PersonalDataService from "../services/personal.service";
import { Link } from "react-router-dom";

export default class PersonalsList extends Component {
  constructor(props) {
    super(props);
    this.retrievePersonals = this.retrievePersonals.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePersonal = this.setActivePersonal.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      Personals: [],
      currentPersonal: null,
      currentIndex: -1,
    };
    
  }

  deleteTutorial() {    
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

  deletePersonal() {
    var data = {
      id: this.state.id
    };

    PersonalDataService.delete(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { Personals, currentPersonal, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Personals List</h4>

          <ul className="list-group">
            {Personals &&
              Personals.map((Personal, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePersonal(Personal, index)}
                  key={index}
                >
                  {Personal.nombre}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentPersonal ? (
            <div>
              <h4>Personal</h4>
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
              <Link
                to={"/update_personal_details/" + currentPersonal.id}
                className="m3 btn btn-sm btn-warning"
              >
                Editar
              </Link>
              
              
             <br></br>
             <br></br>
            <button
              className="m3 btn btn-sm btn-danger"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>


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
