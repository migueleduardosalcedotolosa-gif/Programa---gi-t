document.addEventListener("DOMContentLoaded", () => {
    const botonCerrar = document.querySelector(".c1");

    botonCerrar.addEventListener("click", () => {

        // Si guardaste algo en localStorage o sessionStorage, aquí lo puedes borrar
        
        sessionStorage.clear();

        // Redirigir a la página de inicio
        window.location.href = "index.html";
    });
});
