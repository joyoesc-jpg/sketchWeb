import "./LogInPage.css";
import { useNavigate } from "react-router";
import { LogIn } from "../utils/dbUtils";
import { useRef, useState } from "react";

function LogInPage(){

    const navigate = useNavigate();

    const userIn = useRef();
    const passIn = useRef();

    const [wrongState, setWrongState] = useState(false);
    const [wrongMessage, setWrongMessage] = useState("");

    async function submitLogIn(e){
        e.preventDefault();

        setWrongState(false);
        setWrongMessage("");

        if(userIn == "" || passIn == ""){
            setWrongMessage("Uno o ambos campos están vacíos.");
            setWrongState(true);
        }

        try{
            const {data} = await LogIn({
                userName: userIn.current.value,
                password: passIn.current.value
            });
            if(data.id != null){
                localStorage.setItem("idUser", data.id);
                navigate("/");
            }else{
                setWrongMessage("Usuario y/o contraseña no son correctos.");
                setWrongState(true);
            }
        }catch(error){
            setWrongState(true);
            setWrongMessage("Error en la base de datos. Inténtelo de nuevo más tarde.");
            console.log(error);
        }
    }

    return(
        <>
            <h1>Inicio de sesión.</h1>

            <form onSubmit={submitLogIn}>
                <label>Nombre de usuario.</label>
                <input ref={userIn} type="text"></input>

                <label>Contraseña.</label>
                <input ref={passIn} type="password"/>

                {wrongState? <p>{wrongMessage}</p> : null}

                <input type="submit"/>
            </form>
        </>
    );
}

export default LogInPage;