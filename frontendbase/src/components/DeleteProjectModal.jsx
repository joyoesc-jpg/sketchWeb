import "./CreateProjectForm.css";
import {CreateProject} from "../utils/dbUtils"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function DeleteProjectModal({openModal, onCancel, onDeleteProject}){

    if(!openModal){
        return null;
    }
    
    return(
        <div className="bg-modal" onClick={onCancel}>
            <div className="div-form" onClick={e=>{e.stopPropagation()}}>
                <label>¿Está seguro de borrar el proyecto?.</label>
                <button onClick={onCancel} type="button">Cancelar</button>
                <button onClick={onDeleteProject} type="button">Borrar.</button>
            </div>
        </div>
    )
}