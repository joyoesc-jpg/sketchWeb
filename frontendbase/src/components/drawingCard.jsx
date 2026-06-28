import "./drawingCard.css";

function DrawingCard({
    drawing,
    onOpen,
    onDelete
}) {
    return (
        <div className="drawing-card">

            <img
                src={(drawing.preview != "null")? drawing.preview : "/null.png"}
                alt={drawing.title}
            />

            <h3>
                {drawing.title}
            </h3>

            <div className="actions">

                <button
                    onClick={() => onOpen(drawing)}
                >
                    Abrir
                </button>

                <button
                    onClick={() => onDelete(drawing)}
                >
                    Borrar
                </button>

            </div>

        </div>
    );
}

export default DrawingCard;