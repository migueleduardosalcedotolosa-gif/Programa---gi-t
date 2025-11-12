document.addEventListener("DOMContentLoaded", () => {
  const btnAtras = document.querySelector(".atras");

  if (btnAtras) {
    btnAtras.addEventListener("click", () => {
      const origen = sessionStorage.getItem("origen");
      if (origen === "registro") {
        window.location.href = "COF.html";
      } else {
        window.location.href = "index.html";
      }
    });
  }
});