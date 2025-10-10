document.addEventListener("DOMContentLoaded", function () {
  let tipoUsuario = null;

  const btnProfesional = document.querySelector(".boton_sub1");
  const btnAficionado = document.querySelector(".boton_sub2");
  const btnRegistrarse = document.querySelector(".profesional-btn");
  const inputNombre = document.querySelector('input[placeholder="nombres completos"]');

  // Guardar el tipo de usuario seleccionado
  btnProfesional.addEventListener("click", function () {
    tipoUsuario = "profesional";
    alert("Has seleccionado: Profesional");
  });

  btnAficionado.addEventListener("click", function () {
    tipoUsuario = "aficionado";
    alert("Has seleccionado: Aficionado");
  });

  // Validar al hacer clic en REGISTRARSE
  btnRegistrarse.addEventListener("click", function (event) {
    const nombreCompleto = inputNombre.value.trim().toLowerCase();

    if (!nombreCompleto) {
      alert("Por favor ingresa tu nombre completo.");
      event.preventDefault();
      return;
    }

    if (!tipoUsuario) {
      alert("Por favor selecciona si eres Profesional o Aficionado.");
      event.preventDefault();
      return;
    }

    const primerNombre = nombreCompleto.split(" ")[0];
    const inicial = primerNombre.charAt(0);

    if (tipoUsuario === "profesional") {
      if (["a", "b", "c"].includes(inicial)) {
        alert("Registro exitoso. Serás redirigido al inicio de sesión.");
        window.location.href = "cuerpo_tecnico.html"; 
      } else {
        alert("Tu información no es correcta.");
        inputNombre.value = "";
        event.preventDefault();
      }
    } else {
      alert("Registro exitoso como aficionado. Serás redirigido al inicio de sesión.");
      window.location.href = "cuerpo_tecnico.html"; 
    }
  });
  const botonesRegistro = document.querySelectorAll(".B1");

if (botonesRegistro.length >= 3) {
  botonesRegistro[0].addEventListener("click", () => {
    sessionStorage.setItem("origen", "registro"); 
    window.location.href = "bienvenidos_a_cof.html"; 
  });

  botonesRegistro[1].addEventListener("click", () => {
    sessionStorage.setItem("origen", "registro"); 
    window.location.href = "que_es_cof.html"; 
  });

  botonesRegistro[2].addEventListener("click", () => {
    sessionStorage.setItem("origen", "registro"); 
    window.location.href = "para_que_sirve_cof.html"; 
  });
}
});



