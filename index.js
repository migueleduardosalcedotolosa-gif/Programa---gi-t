document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const btnForgot = document.getElementById("btnForgot");
  const botonesHeader = document.querySelectorAll(".B1");
  const btnRegistrate = document.querySelector(".R1");

  // Header: botones amarillos
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

  if (btnRegistrate) {
    btnRegistrate.addEventListener("click", () => {
      // Lleva a la página de registro
      window.location.href = "COF.html";
    });
  }

  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const correoInput = document.getElementById("correo");
    const passwordInput = document.getElementById("password");
    const correo = correoInput ? correoInput.value.trim().toLowerCase() : "";
    const password = passwordInput ? passwordInput.value : "";

    const usuarioJSON = localStorage.getItem("usuario");
    if (!usuarioJSON) {
      alert("No hay usuarios registrados. Regístrate primero.");
      return;
    }

    let usuario;
    try {
      usuario = JSON.parse(usuarioJSON);
    } catch (err) {
      alert("Error leyendo usuario registrado. Regístrate de nuevo.");
      return;
    }

    // Si quieres hacer bypass (iniciar sesión sin credenciales) no lo recomiendo.
    // Aquí validamos contra el usuario guardado:
    if (correo === usuario.correo && password === usuario.password) {
      // iniciamos sesión: puedes guardar un flag en sessionStorage
      sessionStorage.setItem("sesion_activa", JSON.stringify({
        correo: usuario.correo,
        nombre: usuario.nombreCompleto,
        tipo: usuario.tipoUsuario,
        loggedAt: new Date().toISOString()
      }));
      alert("Has iniciado sesión");
      window.location.href = "afisionado.html";
    } else {
      alert("Credenciales incorrectas");
    }
  });

  if (btnForgot) {
    btnForgot.addEventListener("click", () => {
      // Comportamiento simple: si hay un usuario guardado mostramos su correo parcialmente
      const usuarioJSON = localStorage.getItem("usuario");
      if (!usuarioJSON) {
        alert("No hay usuarios registrados.");
        return;
      }
      const usuario = JSON.parse(usuarioJSON);
      const correo = usuario && usuario.correo ? usuario.correo : null;
      if (!correo) {
        alert("No hay correo registrado para recuperación.");
        return;
      }
      // mostrar sólo parte del correo
      const partes = correo.split("@");
      const local = partes[0];
      const dominio = partes[1] || "";
      const visibleLocal = local.length > 3 ? local.slice(0, 3) + "...": local;
      alert("Correo registrado (parcial): " + visibleLocal + "@" + dominio + "\nSi no recuerdas tu contraseña, regístrate de nuevo o contacta soporte.");
    });
  }
});
