import { useRef } from "react";
import viewStyles from "../view.module.scss";

const BRANDS = [
  { id: "default",    label: "Default" },
  { id: "farmaenvios", label: "Farmaenvíos" },
  { id: "agm",          label: "AGM" },
  { id: "massalud",     label: "MásSalud" },
  { id: "rbduck",       label: "RB Duck" },
  { id: "neracode",     label: "Neracode" },
];

export default function Testing() {
  const rippleRef = useRef(null);

  const changeThemeWithRipple = (brand, evt) => {
    const root = document.documentElement;
    const currentBrand = root.getAttribute("data-brand") || "default";

    // ⛔️ Si el usuario eligió el mismo tema, no hagas nada
    if (brand === currentBrand) return;

    const ripple = rippleRef.current;
    if (!ripple) return;

    // evita animaciones solapadas
    if (ripple.dataset.animating === "true") return;
    ripple.dataset.animating = "true";

    // centro del clic
    ripple.style.setProperty("--x", `${evt.clientX}px`);
    ripple.style.setProperty("--y", `${evt.clientY}px`);

    // 1) arranca con el color del tema ACTUAL (se mantiene durante la expansión)
    const oldBg = getComputedStyle(root).getPropertyValue("--bg").trim();
    ripple.style.backgroundColor = oldBg;

    // 2) prepara el overlay con el NUEVO tema para leer su color destino
    ripple.setAttribute("data-brand", brand);
    const newBg = getComputedStyle(ripple).getPropertyValue("--bg").trim();

    // reset & reflow
    ripple.classList.remove("is-expanding","is-covered","is-contracting","is-fading");
    ripple.offsetWidth;

    // 3) Fase de expansión (clip-path). Color sigue viejo.
    ripple.classList.add("is-expanding");

    const onExpandEnd = (e) => {
      if (e.propertyName !== "clip-path") return;
      ripple.removeEventListener("transitionend", onExpandEnd);

      // 4) Ya cubrió: pasamos a 'covered' y animamos SOLO el color por 500ms
      ripple.classList.remove("is-expanding");
      ripple.classList.add("is-covered");

      // aplica el tema nuevo debajo (no se ve porque está cubierto)
      root.setAttribute("data-brand", brand);

      // dispara la transición de color durante la fase cubierta
      // (hacerlo en el siguiente frame garantiza que tome la transición de .is-covered)
      requestAnimationFrame(() => {
        ripple.style.backgroundColor = newBg;
      });

      const onColorEnd = (e2) => {
        if (e2.propertyName !== "background-color") return;
        ripple.removeEventListener("transitionend", onColorEnd);

        // 5) Contraer
        ripple.classList.remove("is-covered");
        ripple.classList.add("is-contracting");

        const onContractEnd = (e3) => {
          if (e3.propertyName !== "clip-path") return;
          ripple.removeEventListener("transitionend", onContractEnd);

          // 6) Fade-out y limpieza
          ripple.classList.remove("is-contracting");
          ripple.classList.add("is-fading");

          const onFadeEnd = () => {
            ripple.removeEventListener("transitionend", onFadeEnd);
            ripple.classList.remove("is-fading");
            ripple.removeAttribute("data-animating");

            // deja listo el color actual para un click inmediato
            const currentBg = getComputedStyle(root).getPropertyValue("--bg").trim();
            ripple.style.backgroundColor = currentBg;
            ripple.setAttribute("data-brand", root.getAttribute("data-brand") || "default");
          };

          ripple.addEventListener("transitionend", onFadeEnd);
        };

        ripple.addEventListener("transitionend", onContractEnd);
      };

      ripple.addEventListener("transitionend", onColorEnd);
    };

    ripple.addEventListener("transitionend", onExpandEnd);
  };

  return (
    <main className={viewStyles.viewWrapper}>
      {/* Overlay del ripple */}
      <div id="theme-ripple" ref={rippleRef} data-brand="default" />

      <h1 style={{ marginBottom: 12 }}>Playground de temas</h1>
      <p className="text-muted" style={{ marginBottom: 16 }}>
        Haz click en un botón para cambiar el tema con un efecto de círculo expansivo.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        {BRANDS.map((b) => (
          <button
            key={b.id}
            className="btn btn-primary"
            onClick={(e) => changeThemeWithRipple(b.id, e)}
            title={`Cambiar a ${b.label}`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <section style={{ display: "grid", gap: 16 }}>
        <div className="card">
          <strong>Card</strong>
          <p className="text-muted">Usa <code>--card</code> y texto con <code>--text</code>.</p>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button className="btn btn-primary">Primario</button>
            <button className="btn btn-secondary">Secundario</button>
            <button className="btn btn-outline">Outline</button>
          </div>
        </div>

        <div className="card" style={{ display: "grid", gap: 8 }}>
          <strong>Tokens actuales</strong>
          <Swatch varName="--bg" label="bg" />
          <Swatch varName="--card" label="card" />
          <Swatch varName="--primary" label="primary" />
          <Swatch varName="--secondary" label="secondary" />
          <Swatch varName="--text" label="text" />
        </div>
      </section>
    </main>
  );
}

function Swatch({ varName, label }) {
  const boxStyle = {
    width: 28,
    height: 20,
    borderRadius: 6,
    border: "1px solid color-mix(in oklab, var(--text), var(--bg) 80%)",
    background: `var(${varName})`,
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={boxStyle} />
      <code>{label}</code>
      <span style={{ fontSize: 12, color: "color-mix(in oklab, var(--text), var(--bg) 45%)" }}>
        {varName}
      </span>
    </div>
  );
}
