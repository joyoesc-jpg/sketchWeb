import { getProjects } from "../utils/dbUtils";
import DrawingCard from "../components/DrawingCard";
import CreateProjectForm from "../components/CreateProjectForm";
import "./GalleryPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function GalleryPage() {

    const navigate = useNavigate();
    const idUser = new Number(localStorage.getItem("idUser"));
    if(idUser == -1){
        navigate("/login");
    }

    const [openModal, setOpenModal] = useState(false);

    const [drawings, setDrawings] = useState([]);

    const setIdProject = id => {
        localStorage.setItem("idProject", id);
    }

    useEffect(()=>{
        const getData = async () => {
            try{
                const {data} = await getProjects({idUser});
                
                if(typeof(data.drawings) != "undefined"){
                    setDrawings(data.drawings);
                }else{
                    return;
                }
            }catch(e){
                console.log(e);
            }
        }

        getData();
    }, []);

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