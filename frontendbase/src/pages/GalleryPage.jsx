import { deleteProject, getProjects } from "../utils/dbUtils";
import DrawingCard from "../components/DrawingCard";
import CreateProjectForm from "../components/CreateProjectForm";
import "./GalleryPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DeleteProjectModal from "../components/DeleteProjectModal";

function GalleryPage() {

    const navigate = useNavigate();
    const idUser = new Number(localStorage.getItem("idUser"));
    if(idUser == -1){
        navigate("/login");
    }

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [drawings, setDrawings] = useState([]);

    const [loading, setLoading] = useState(true);

    const setIdProject = id => {
        localStorage.setItem("idProject", id);
    }

    const onCancelDelete = () => {
        setOpenModalDelete(false);
        setDeleteId(null);
    }

    const openDrawing = drawing => {
        localStorage.setItem("idProject", drawing.id);
        navigate("/edit");
    }

    const beforeDelete = (drawing) =>{
        const id = drawing.id;
        setOpenModalDelete(true);
        setDeleteId(id);
    }

    const deleteDrawing = async () => {
        const {data} = await deleteProject({"idProject": deleteId});
        console.log(data);
        navigate(0);
    }

    useEffect(()=>{
        const fetchData = async () =>{
            setLoading(true);
            try{
                const {data} = await getProjects({idUser});
                if(typeof(data.drawings) != "undefined"){
                    setDrawings(data.drawings);
                }else{
                    return;
                }
            }catch(e){
                console.log(e);
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if(loading){
        return <h1>Cargando</h1>
    }

    return (
        <div className="gallery-page">
            <CreateProjectForm 
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                idUser={idUser}
                setIdProject={setIdProject}
            />

            <DeleteProjectModal
                openModal={openModalDelete}
                onCancel={onCancelDelete}
                onDeleteProject={deleteDrawing}
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
                                    onOpen={openDrawing}
                                    onDelete={beforeDelete}
                                />

                            )
                        )
                }

            </div>

            <button onClick={()=>{setOpenModalCreate(true)}}>Crear projecto</button>

        </div>
    );
}

export default GalleryPage;