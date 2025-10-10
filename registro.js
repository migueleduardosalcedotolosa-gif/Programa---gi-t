document.addEventListener("DOMContentLoaded", function () {
  let tipoUsuario = null;

  const btnProfesional = document.querySelector(".boton_sub1");
  const btnAficionado = document.querySelector(".boton_sub2");
  const btnRegistrarse = document.querySelector(".profesional-btn");
  const inputNombre = document.querySelector('input[placeholder="nombres completos"]');
  const inputCorreo = document.querySelector('input[placeholder="correo"]');
  const inputPassword = document.getElementById("password");

  // Guardar el tipo de usuario seleccionado
  btnProfesional.addEventListener("click", function () {
    tipoUsuario = "profesional";
    alert("Has seleccionado: Profesional");
  });

  btnAficionado.addEventListener("click", function () {
    tipoUsuario = "aficionado";
    alert("Has seleccionado: Aficionado");
  });

  // Validar y registrar
  btnRegistrarse.addEventListener("click", function (event) {
    event.preventDefault();

    const nombreCompleto = inputNombre.value.trim().toLowerCase();
    const correo = inputCorreo.value.trim();
    const password = inputPassword.value.trim();

    if (!nombreCompleto || !correo || !password) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (!tipoUsuario) {
      alert("Por favor selecciona si eres Profesional o Aficionado.");
      return;
    }

    const primerNombre = nombreCompleto.split(" ")[0];
    const inicial = primerNombre.charAt(0);

    if (tipoUsuario === "profesional" && !["a", "b", "c"].includes(inicial)) {
      alert("Tu información no es correcta.");
      inputNombre.value = "";
      return;
    }

    // Guardar en localStorage
    const usuario = {
      nombre: nombreCompleto,
      correo: correo,
      password: password,
      tipo: tipoUsuario
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Registro exitoso. Serás redirigido al inicio de sesión.");
     window.location.href = "login.html"; // Descomenta si tienes una página de login
  });
});