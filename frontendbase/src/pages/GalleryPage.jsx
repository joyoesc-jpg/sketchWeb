import { getProjects } from "../utils/dbUtils";
import DrawingCard from "../components/DrawingCard";
import CreateProjectForm from "../components/CreateProjectForm";
import "./GalleryPage.css";
import { useEffect, useState } from "react";

function GalleryPage({idUser, setIdProject}) {

    if(idUser == -1){
        window.location.href = "/login";
    }

    const [openModal, setOpenModal] = useState(false);

    const [drawings, setDrawings] = useState([]);

    ///useEffect(async ()=>{
    ///    try{
    ///        const {data} = await getProjects({idUser});
///
    ///        console.log(data);
///
///
    ///    }catch(e){
    ///        console.log(e);
    ///    }
    ///}, []);

    return (
        <div className="gallery-page">
            <CreateProjectForm 
                openModal={openModal}
                setOpenModal={setOpenModal}
                idUser={idUser}
                setIdProject={setIdProject}
            />

            <h1>
                Mis Dibujos
            </h1>

            <div
                className="gallery-grid"
            >

                {
                    drawings.length == 0? null : 
                        drawings.map(
                            drawing => (

                                <DrawingCard
                                    key={drawing.id}
                                    drawing={drawing}
                                    onOpen={() => {}}
                                    onExport={() => {}}
                                    onDelete={() => {}}
                                />

                            )
                        )
                }

            </div>

            <button onClick={()=>{setOpenModal(true)}}>Crear projecto</button>

        </div>
    );
}

export default GalleryPage;