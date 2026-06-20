import DrawingCard from "../components/DrawingCard";
import "./GalleryPage.css";

function GalleryPage() {

    const drawings = [

        {
            id: 1,
            title: "Montaña",
            preview:
                "https://picsum.photos/300"
        },

        {
            id: 2,
            title: "Bosque",
            preview:
                "https://picsum.photos/301"
        },

        {
            id: 3,
            title: "Lago",
            preview:
                "https://picsum.photos/302"
        }

    ];

    return (

        <div className="gallery-page">

            <h1>
                Mis Dibujos
            </h1>

            <div
                className="gallery-grid"
            >

                {
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

        </div>
    );
}

export default GalleryPage;