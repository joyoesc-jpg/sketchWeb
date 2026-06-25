import "./CreateProjectForm.css";
import {CreateProject} from "../utils/dbUtils"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function CreateProjectForm({openModal, setOpenModal, idUser, setIdProject}){

    const pNameInput = useRef();
    const form = useRef()
    const [wrongState, setWrongState] = useState("");
    const [wrongMessage, setWrongMessage] = useState(false);
    const navigate = useNavigate();

    function cancel(){
        setWrongMessage("");
        setWrongState(false);
        setOpenModal(false);
    }

    async function handleSubmit(e){
        e.preventDefault();
        setWrongMessage("");
        setWrongState(false);
        const projectName = pNameInput.current.value;

        if(projectName == ""){
            setWrongMessage("El campo está vacío.");
            setWrongState(true);
            return;
        }

        try{
            const {data} = await CreateProject({idUser, projectName});

            if(data.error != undefined){
                if(data.error == "ExistingName"){
                    setWrongMessage("El nombre ya existe.");
                }else{
                    setWrongMessage("Error en la base de datos. Vuelva a intentarlo más tarde.");
                }
                setWrongState(true);
                return;
            }

            if(data.id == null){
                setWrongMessage("Error en la base de datos. Vuelva a intentarlo más tarde.");
                setWrongState(true);
                return;
            }
            setIdProject(data.id);
            navigate("/edit");
        }catch(e){
            setWrongMessage("Error en la base de datos. Vuelva a intentarlo más tarde.");
        }
    }

    if(!openModal){
        return null;
    }
    
    return(
        <div className="bg-modal" onClick={cancel}>
            <div className="div-form" onClick={e=>{e.stopPropagation()}}>
                <form onSubmit={handleSubmit}>
                    <label>Nombre del proyecto.</label>
                    <input ref={pNameInput} type="text"/>
                    <p className="errorMessage">{wrongMessage}</p>
                    <button onClick={cancel} type="button">Cancelar</button>
                    <input type="submit"/>
                </form>
            </div>
        </div>
    )
}