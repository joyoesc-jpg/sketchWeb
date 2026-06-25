import React from "react";
import {Navigate} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
  constructor()
  {
    super();
    this.state = {condition: false,tipousuario:''}
 }

      validar=(usuario,password) =>{
        //fetch('http://localhost:8080/Login?User='+usuario+'&password='+password+'')
        fetch('Login?user='+usuario+'&password='+password+'')
        .then(response => response.json())
        .then(usuario =>{
          if(usuario.status=="yes")
          {             
          if(usuario.tipo=="administrador")
          {
          alert("USUARIO VALIDO");
          this.setState({ condition: true,tipousuario:'administrador'});          
          }          
          }          
          else          
          {
          alert("USUARIO NO VALIDO");
          this.setState({ condition: false,tipousuario:'' });                                        
          }
        })
     
    }
    render() {
      const styles = {
          padding : '5px'
      }

      const { condition,tipousuario } = this.state;

      if (condition && tipousuario=="administrador") 
      {
        return <Navigate to='/administrator' />;
      }

      return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f5f5"
            }}
        >
            <div
                className="card p-5 shadow-sm"
                style={{
                    width: "450px",
                    borderRadius: "15px"
                }}
            >
                <h2
                    className="text-center mb-4"
                    style={{
                        fontWeight: "bold"
                    }}
                >
                    Bienvenido
                </h2>

                <div className="mb-3">
                    <label htmlFor="user" className="form-label">
                        Usuario
                    </label>

                    <input
                        id="user"
                        type="text"
                        className="form-control"
                        placeholder="Ingrese su usuario"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>

                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="Ingrese su contraseña"
                    />
                </div>

                <button
                    className="btn text-white w-100"
                    style={{
                        backgroundColor: "#e4572e",
                        borderColor: "#e4572e",
                        fontWeight: "bold"
                    }}
                    onClick={() =>
                        this.validar(
                            document.getElementById("user").value,
                            document.getElementById("password").value
                        )
                    }
                >
                    Ingresar
                </button>
            </div>
        </div>
        );
  }
}
export default Login; 