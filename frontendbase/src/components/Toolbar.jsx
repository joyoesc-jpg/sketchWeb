import "./Toolbar.css";

function Toolbar({
  color,
  setColor,
  size,
  setSize,
  opacity,
  setOpacity,
  brushType,
  setBrushType,
  undoAction,
  redoAction,
  exportPNGAction,
  exportTimelapseAction,
  saveProjectAction,
  exitAction
}) {
  return (
    <div className="toolbar">
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <input
        type="range"
        min="1"
        max="50"
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
      />

      <input
        type="range"
        min="0.1"
        max="1"
        step="0.1"
        value={opacity}
        onChange={(e) => setOpacity(Number(e.target.value))}
      />

      <select
        value={brushType}
        onChange={(e) => setBrushType(e.target.value)}
      >
        <option value="pen">Pluma</option>
        <option value="charcoal">Carboncillo</option>
        <option value="watercolor">Acuarela</option>
        <option value="oil">Óleo</option>
      </select>

      <button
          onClick={() => undoAction?.()}
      >
          Deshacer
      </button>

      <button
          onClick={() => redoAction?.()}
      >
          Rehacer
      </button>

      <button
          onClick={() => exportPNGAction?.()}
      >
          Exportar PNG
      </button>

      <button
          onClick={() => exportTimelapseAction?.()}
      >
          Exportar Timelapse
      </button>
      <button
          onClick={() => saveProjectAction?.()}
      >
          Guardar
      </button>

      <button
          onClick={() => exitAction?.()}
      >
          Guardar y Salir
      </button>
    </div>
  );
}

export default Toolbar;