document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const btnForgot = document.getElementById("btnForgot");

  // 🔹 Manejo del login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();

    // Obtener usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
      alert("No hay usuarios registrados. Regístrate primero.");
      return;
    }

    if (correo === usuario.correo && password === usuario.password) {
      alert("Has iniciado sesión");
      window.location.href = "bienvenidos_a_cof.html"; // 🔹 Redirigir al home final
    } else {
      alert("Credenciales incorrectas");
    }
  });

  // 🔹 Botón de recuperar datos
  btnForgot.addEventListener("click", () => {
    alert("Función de recuperación no implementada todavía.");
  });

  // 🔹 Botones del encabezado
  const botonesHeader = document.querySelectorAll(".B1");
  if (botonesHeader.length >= 3) {
    botonesHeader[0].addEventListener("click", () => {
      window.location.href = "bienvenidos_a_cof.html";
    });
    botonesHeader[1].addEventListener("click", () => {
      window.location.href = "que_es_cof.html";
    });
    botonesHeader[2].addEventListener("click", () => {
      window.location.href = "para_que_sirve_cof.html";
    });
  }
});
