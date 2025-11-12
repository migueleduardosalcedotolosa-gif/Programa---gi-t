document.addEventListener("DOMContentLoaded", function () {
  let tipoUsuario = null;

  // Botones y campos según tu HTML
  const btnProfesional = document.querySelector(".boton_sub1");
  const btnAficionado = document.querySelector(".boton_sub2");
  const btnRegistrarse = document.querySelector(".profesional-btn");
  const inputNombre = document.querySelector('input[placeholder="nombres completos"]');
  const inputCedula = document.querySelector('input[placeholder*="Cédula"], input[name="cedula"], input[id="cedula"]');
  const inputFecha = document.querySelector('input[placeholder*="fecha"], input[type="date"], input[name="fecha"], input[id="fecha"]');
  const inputCorreo = document.querySelector('input[type="email"], input[placeholder*="correo"], input[name="correo"], input[id="correo"]');
  const inputCelular = document.querySelector('input[placeholder*="celular"], input[name="celular"], input[id="celular"]');
  const inputPassword = document.querySelector('input[type="password"], input[placeholder*="contraseña"], input[name="password"], input[id="password"]');
  const inputPasswordConfirm = document.querySelector('#confirmPassword');

  const botonesHeader = document.querySelectorAll(".B1");
  const btnAtras = document.querySelector(".atras");

  // Header amarillo
  if (botonesHeader.length >= 3) {
    botonesHeader[0].addEventListener("click", () => {
      sessionStorage.setItem("origen", "registro");
      window.location.href = "bienvenidos_a_cof.html";
    });
    botonesHeader[1].addEventListener("click", () => {
      sessionStorage.setItem("origen", "registro");
      window.location.href = "que_es_cof.html";
    });
    botonesHeader[2].addEventListener("click", () => {
      sessionStorage.setItem("origen", "registro");
      window.location.href = "para_que_sirve_cof.html";
    });
  }

  if (btnProfesional) {
    btnProfesional.addEventListener("click", function () {
      tipoUsuario = "profesional";
      alert("Has seleccionado: Profesional");
    });
  }
  if (btnAficionado) {
    btnAficionado.addEventListener("click", function () {
      tipoUsuario = "aficionado";
      alert("Has seleccionado: Aficionado");
    });
  }

  if (btnAtras) {
    btnAtras.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  // Helpers de validación
  function tieneDobleEspacio(s) {
    return s.includes("  ");
  }

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validarCedula(cedula) {
    if (!cedula) return false;
    return /^\d{6,12}$/.test(cedula);
  }

  function validarCelular(cel) {
    if (!cel) return false;
    return /^\d{7,15}$/.test(cel);
  }

  function validarFechaNacimiento(fechaInput) {
    if (!fechaInput) return { ok: true };
    let valor = fechaInput.value.trim();
    if (!valor) return { ok: false, msg: "Por favor ingresa la fecha de nacimiento." };

    let d;
    if (fechaInput.type === "date") {
      d = new Date(valor + "T00:00:00");
    } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(valor)) {
      const parts = valor.split("/");
      d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`);
    } else {
      d = new Date(valor);
    }

    if (isNaN(d.getTime())) return { ok: false, msg: "Formato de fecha inválido." };

    const hoy = new Date();
    if (d > hoy) return { ok: false, msg: "La fecha de nacimiento no puede ser en el futuro." };

    const edad = hoy.getFullYear() - d.getFullYear() - ((hoy.getMonth() < d.getMonth() || (hoy.getMonth() === d.getMonth() && hoy.getDate() < d.getDate())) ? 1 : 0);
    if (edad < 0 || edad > 120) return { ok: false, msg: "Fecha de nacimiento fuera de rango razonable." };

    return { ok: true, edad };
  }

  function mostrarMensajeYCancelar(msg, ev) {
    alert(msg);
    if (ev) ev.preventDefault();
  }

  // Lógica del registro
  if (btnRegistrarse) {
    btnRegistrarse.addEventListener("click", function (event) {
      const nombreCompleto = inputNombre ? inputNombre.value.trim() : "";
      const cedula = inputCedula ? inputCedula.value.trim() : "";
      const correo = inputCorreo ? (inputCorreo.value || "").trim().toLowerCase() : "";
      const celular = inputCelular ? inputCelular.value.trim() : "";
      const password = inputPassword ? inputPassword.value.trim() : "";
      const passwordConfirm = inputPasswordConfirm ? inputPasswordConfirm.value.trim() : "";
      const fechaVal = validarFechaNacimiento(inputFecha);

      // Validaciones generales
      if (!nombreCompleto) { mostrarMensajeYCancelar("Por favor ingresa tu nombre completo.", event); return; }
      if (tieneDobleEspacio(nombreCompleto)) { mostrarMensajeYCancelar("El nombre contiene doble espacio. Corrige.", event); return; }
      if (nombreCompleto.split(" ").filter(Boolean).length < 2) {
        if (!confirm("¿Estás seguro de que ingresaste nombre y apellido?")) { event.preventDefault(); return; }
      }

      if (inputCedula && !validarCedula(cedula)) { mostrarMensajeYCancelar("Cédula inválida.", event); return; }
      if (!validarEmail(correo)) { mostrarMensajeYCancelar("Correo inválido.", event); return; }
      if (inputCelular && !validarCelular(celular)) { mostrarMensajeYCancelar("Celular inválido.", event); return; }
      if (!fechaVal.ok) { mostrarMensajeYCancelar(fechaVal.msg, event); return; }

      // Validación real de contraseña
      if (!password || password.length < 6) {
        mostrarMensajeYCancelar("La contraseña debe tener mínimo 6 caracteres.", event);
        return;
      }

      if (!passwordConfirm) {
        mostrarMensajeYCancelar("Por favor confirma tu contraseña.", event);
        return;
      }

      if (password !== passwordConfirm) {
        mostrarMensajeYCancelar("Las contraseñas no coinciden.", event);
        return;
      }

      // Regla especial por inicial
      const partes = nombreCompleto.split(" ").filter(Boolean);
      const inicial = partes[0].charAt(0).toUpperCase();
      const inicialValidaParaProfesional = ["A", "B", "C"].includes(inicial);

      if (tipoUsuario === "profesional" && !inicialValidaParaProfesional) {
        alert("NO APARECES COMO PROFESIONAL, SERÁS REMITIDO A AFICIONADO");
        tipoUsuario = "aficionado";
      }

      if (tipoUsuario === "aficionado" && inicialValidaParaProfesional) {
        alert("Se detecta que eres profesional. Serás remitido al área profesional.");
        tipoUsuario = "profesional";
      }

      if (!tipoUsuario) {
        mostrarMensajeYCancelar("Selecciona si eres Profesional o Aficionado.", event);
        return;
      }

      // Guardado en localStorage
      const usuario = {
        nombreCompleto,
        cedula: cedula || null,
        fechaNacimiento: inputFecha ? inputFecha.value : null,
        correo,
        celular: celular || null,
        password,
        tipoUsuario
      };

      try {
        localStorage.setItem("usuario", JSON.stringify(usuario));
      } catch (err) {
        alert("Error al guardar el usuario: " + err.message);
        event.preventDefault();
        return;
      }

      alert("Registro exitoso. Serás redirigido al inicio de sesión.");
      window.location.href = "index.html";
    });
  }
});