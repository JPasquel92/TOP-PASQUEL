"use strict";

/* CONFIGURACIÓN: escribe el número comercial real con código de país.
   Para Perú: 51 seguido de los 9 dígitos. Sin +, espacios ni guiones.
   Vacío: WhatsApp permite elegir el destinatario. No se inventa un número. */
const CONFIGURACION = Object.freeze({
  whatsappNumero: ""
});

document.documentElement.classList.add("js");

/* Los casos son ilustrativos. Sustitúyelos por proyectos autorizados. */
const aplicaciones = {
  levantamiento: {
    titulo: "Levantamiento del terreno",
    categoria: "TOPOGRAFÍA / PLANIFICACIÓN",
    imagen: "img/levantamiento-terreno.webp",
    alt: "Topógrafo con estación total en un terreno montañoso, fotografía referencial",
    descripcion: "Una base planimétrica y altimétrica permite conocer el relieve, los elementos existentes y las condiciones geométricas antes de diseñar. La metodología se define con el área, acceso y detalle que necesita el proyecto.",
    entregables: ["Plano topográfico y curvas de nivel.", "Listado de puntos y coordenadas.", "Modelo del terreno e informe según la propuesta."],
    servicio: "Levantamiento topográfico"
  },
  replanteo: {
    titulo: "Del plano a la obra",
    categoria: "OBRAS CIVILES / REPLANTEO",
    imagen: "img/control-de-obra.webp",
    alt: "Operario con instrumento óptico en una obra, fotografía referencial",
    descripcion: "El replanteo traslada al campo los ejes, niveles y puntos del diseño. El control topográfico acompaña la ejecución para comparar lo construido con los criterios geométricos del proyecto.",
    entregables: ["Puntos y ejes materializados según el alcance.", "Registro de niveles y controles de campo.", "Planos o reporte de replanteo acordados."],
    servicio: "Replanteo y control de obras"
  },
  lotizacion: {
    titulo: "Terrenos con proyección",
    categoria: "TERRITORIO / PLANIFICACIÓN URBANA",
    imagen: "img/levantamiento-urbano.webp",
    alt: "Medición de un terreno abierto con instrumento sobre trípode, fotografía referencial",
    descripcion: "La información topográfica respalda la organización de lotes, accesos y áreas del proyecto. Se trabaja a partir de la documentación disponible y de los objetivos técnicos definidos con el cliente.",
    entregables: ["Base topográfica del área de intervención.", "Plano de distribución y cuadro de áreas según el encargo.", "Coordenadas y documentación técnica acordada."],
    servicio: "Lotizaciones y habilitaciones urbanas"
  }
};

function crearEnlaceWhatsApp(mensaje) {
  const numero = CONFIGURACION.whatsappNumero.trim();
  const numeroValido = /^[1-9]\d{7,14}$/.test(numero);
  return numeroValido
    ? `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
    : `https://api.whatsapp.com/send?text=${encodeURIComponent(mensaje)}`;
}

/* 1. MENÚ MÓVIL: sincroniza el estado visual y el estado accesible. */
function iniciarMenu() {
  const boton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".main-nav");
  const escritorio = window.matchMedia("(min-width: 64rem)");

  function cambiarMenu(abierto, devolverFoco = false) {
    boton.setAttribute("aria-expanded", String(abierto));
    boton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    menu.classList.toggle("is-open", abierto);
    if (devolverFoco) boton.focus();
  }

  boton.addEventListener("click", () => {
    cambiarMenu(boton.getAttribute("aria-expanded") !== "true");
  });
  menu.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) cambiarMenu(false);
  });
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && boton.getAttribute("aria-expanded") === "true") {
      cambiarMenu(false, true);
    }
  });
  document.addEventListener("click", (evento) => {
    if (!evento.target.closest(".site-header")) cambiarMenu(false);
  });
  escritorio.addEventListener("change", () => cambiarMenu(false));
}

/* 2. FILTROS: hidden retira las tarjetas también del árbol accesible. */
function iniciarFiltros() {
  const botones = document.querySelectorAll("[data-filter]");
  const tarjetas = document.querySelectorAll(".project-card");
  const estado = document.querySelector("#filter-status");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const categoria = boton.dataset.filter;
      let visibles = 0;
      botones.forEach((otro) => {
        const activo = otro === boton;
        otro.classList.toggle("is-active", activo);
        otro.setAttribute("aria-pressed", String(activo));
      });
      tarjetas.forEach((tarjeta) => {
        const mostrar = categoria === "todos" || tarjeta.dataset.category === categoria;
        tarjeta.hidden = !mostrar;
        if (mostrar) visibles += 1;
      });
      estado.textContent = `${visibles} ${visibles === 1 ? "aplicación disponible" : "aplicaciones disponibles"}.`;
    });
  });
}

/* Utilidades compartidas para los dos diálogos nativos. */
function abrirDialogo(dialogo) {
  dialogo.showModal();
  document.body.classList.add("dialog-open");
}

function iniciarCierreDialogos() {
  document.querySelectorAll("dialog").forEach((dialogo) => {
    dialogo.querySelector("[data-close-dialog]").addEventListener("click", () => dialogo.close());
    dialogo.addEventListener("close", () => document.body.classList.remove("dialog-open"));
    dialogo.addEventListener("click", (evento) => {
      const limites = dialogo.getBoundingClientRect();
      const fuera = evento.clientX < limites.left || evento.clientX > limites.right
        || evento.clientY < limites.top || evento.clientY > limites.bottom;
      if (evento.target === dialogo && fuera) dialogo.close();
    });
  });
}

/* 3. DETALLES DE APLICACIONES: texto con textContent para evitar HTML inyectado. */
function iniciarAplicaciones() {
  const dialogo = document.querySelector("#project-dialog");
  const enlaceCotizar = document.querySelector("#dialog-quote");

  document.querySelectorAll("[data-project]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const aplicacion = aplicaciones[boton.dataset.project];
      if (!aplicacion) return;
      document.querySelector("#dialog-title").textContent = aplicacion.titulo;
      document.querySelector("#dialog-category").textContent = aplicacion.categoria;
      document.querySelector("#dialog-description").textContent = aplicacion.descripcion;
      const imagen = document.querySelector("#dialog-image");
      imagen.src = aplicacion.imagen;
      imagen.alt = aplicacion.alt;
      const lista = document.querySelector("#dialog-deliverables");
      lista.replaceChildren();
      aplicacion.entregables.forEach((texto) => {
        const elemento = document.createElement("li");
        elemento.textContent = texto;
        lista.append(elemento);
      });
      enlaceCotizar.dataset.service = aplicacion.servicio;
      abrirDialogo(dialogo);
    });
  });

  // Los enlaces de servicios dejan la opción correspondiente seleccionada.
  document.addEventListener("click", (evento) => {
    const enlace = evento.target.closest("a[data-service]");
    if (!enlace) return;
    const selector = document.querySelector("#servicio");
    selector.value = enlace.dataset.service;
    selector.dispatchEvent(new Event("change"));
    if (dialogo.open) dialogo.close();
  });
}

/* 4. PREGUNTAS FRECUENTES: <details> funciona incluso sin JavaScript.
   JS mantiene abierta una sola respuesta para reducir el desplazamiento. */
function iniciarPreguntas() {
  const preguntas = document.querySelectorAll(".faq-list details");
  preguntas.forEach((pregunta) => {
    pregunta.addEventListener("toggle", () => {
      if (!pregunta.open) return;
      preguntas.forEach((otra) => {
        if (otra !== pregunta) otra.open = false;
      });
    });
  });
}

/* 5. COTIZACIÓN: validación + vista previa + WhatsApp o archivo de texto.
   No hay backend, base de datos ni envío automático. */
function iniciarCotizacion() {
  const formulario = document.querySelector("#quote-form");
  const dialogo = document.querySelector("#quote-dialog");
  const estado = document.querySelector("#form-status");
  let solicitudActual = "";

  function validarCampo(campo) {
    const valor = campo.value.trim();
    let error = "";
    if (campo.required && campo.type === "checkbox" && !campo.checked) {
      error = "Autoriza compartir tus datos para preparar la solicitud.";
    } else if (campo.required && !valor) {
      error = "Completa este campo.";
    } else if (campo.minLength > 0 && valor && valor.length < campo.minLength) {
      error = `Escribe al menos ${campo.minLength} caracteres.`;
    } else if (campo.type === "email" && valor && campo.validity.typeMismatch) {
      error = "Escribe un correo válido, por ejemplo nombre@empresa.com.";
    } else if (campo.type === "tel" && valor) {
      const digitos = valor.replace(/\D/g, "");
      if (!/^\+?[\d\s().-]+$/.test(valor) || digitos.length < 7 || digitos.length > 15) {
        error = "Escribe un teléfono de 7 a 15 dígitos, con código de país si corresponde.";
      }
    }
    const mensaje = document.getElementById(`error-${campo.id}`);
    if (mensaje) mensaje.textContent = error;
    campo.setAttribute("aria-invalid", String(Boolean(error)));
    return !error;
  }

  const campos = [...formulario.querySelectorAll("[aria-describedby]")];
  campos.forEach((campo) => {
    campo.addEventListener("blur", () => validarCampo(campo));
    campo.addEventListener("input", () => {
      if (campo.getAttribute("aria-invalid") === "true") validarCampo(campo);
    });
    campo.addEventListener("change", () => validarCampo(campo));
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const resultados = campos.map((campo) => validarCampo(campo));
    const primerError = resultados.indexOf(false);
    if (primerError !== -1) {
      estado.textContent = "Revisa los campos indicados para preparar tu solicitud.";
      campos[primerError].focus();
      return;
    }

    const datos = new FormData(formulario);
    const obtener = (nombre) => String(datos.get(nombre) || "").trim();
    solicitudActual = [
      "SOLICITUD DE COTIZACIÓN · TOP PASQUEL",
      "",
      `Nombre: ${obtener("nombre")}`,
      `Empresa: ${obtener("empresa") || "Particular / no indicada"}`,
      `Teléfono: ${obtener("telefono")}`,
      `Correo: ${obtener("correo") || "No indicado"}`,
      `Servicio: ${obtener("servicio")}`,
      `Ubicación: ${obtener("ubicacion")}`,
      `Detalles: ${obtener("detalle") || "Por coordinar"}`,
      "",
      "Solicito información sobre el alcance, entregables, plazo y costo del servicio."
    ].join("\n");

    document.querySelector("#quote-preview").textContent = solicitudActual;
    document.querySelector("#send-whatsapp").href = crearEnlaceWhatsApp(solicitudActual);
    document.querySelector("#whatsapp-note").textContent = CONFIGURACION.whatsappNumero
      ? "El mensaje se abrirá en el chat de atención de TOP PASQUEL."
      : "Elige el contacto de TOP PASQUEL en WhatsApp o descarga tu solicitud para compartirla.";
    estado.textContent = "Solicitud preparada para tu revisión. Todavía no se ha enviado.";
    abrirDialogo(dialogo);
  });

  document.querySelector("#download-request").addEventListener("click", () => {
    const archivo = new Blob([solicitudActual], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(archivo);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "solicitud-cotizacion-top-pasquel.txt";
    document.body.append(enlace);
    enlace.click();
    enlace.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  if (/^[1-9]\d{7,14}$/.test(CONFIGURACION.whatsappNumero.trim())) {
    const flotante = document.querySelector("#whatsapp-link");
    flotante.href = crearEnlaceWhatsApp("Hola, TOP PASQUEL. Me gustaría cotizar un servicio de topografía.");
    flotante.target = "_blank";
    flotante.rel = "noopener noreferrer";
  }
}

iniciarMenu();
iniciarFiltros();
iniciarCierreDialogos();
iniciarAplicaciones();
iniciarPreguntas();
iniciarCotizacion();
document.querySelector("#current-year").textContent = new Date().getFullYear();
