document.addEventListener("DOMContentLoaded", () => {
  const btnAtras = document.querySelector(".atras");

  if (btnAtras) {
    btnAtras.addEventListener("click", () => {
      // Si vino desde registro → regresar a COF.html
      // Si vino desde login → regresar a cuerpo_tecnico.html
      const origen = sessionStorage.getItem("origen");
      if (origen === "registro") {
        window.location.href = "COF.html";
      } else {
        window.location.href = "index.html";
      }
    });
  }
});