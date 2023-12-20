let ataqueJugador;
let ataqueEnemigo;

function seleccionarMascotaJugador() {
  let inputHipodoge = document.getElementById("hipodoge");
  let inputCapipepo = document.getElementById("capipepo");
  let inputRatigueya = document.getElementById("ratigueya");
  let spanMascotaJugador = document.getElementById("masconta-jugador");
  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = "Hipodoge";
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = "Capipepo";
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = "Ratigueya";
  } else {
    alert("No has seleccionado ninguo");
  }
  seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatorio = aleatorio(1, 3);
  let spanMascotaEnemigo = document.getElementById("masconta-enemigo");
  if (mascotaAleatorio == 1) {
    spanMascotaEnemigo.innerHTML = "Hipodoge";
  } else if (mascotaAleatorio == 2) {
    spanMascotaEnemigo.innerHTML = "Capipepo";
  } else {
    spanMascotaEnemigo.innerHTML = "Ratigueya";
  }
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function ataqueFuego() {
  ataqueJugador = "FUEGO";
  ataqueAleatorioEnemigo();
}
function ataqueAgua() {
  ataqueJugador = "AGUA";
  ataqueAleatorioEnemigo();
}
function ataqueTierra() {
  ataqueJugador = "TIERRA";
  ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);
  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "FUEGO";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "AGUA";
  } else {
    ataqueEnemigo = "TIERRA";
  }
  combate();
}

function combate() {
  let resultado;
  if (ataqueJugador == ataqueEnemigo) {
    resultado = "EMPATE";
  } else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") {
    resultado = "GANASTE";
  } else if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") {
    resultado = "GANASTE";
  } else if (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") {
    resultado = "GANASTE";
  } else {
    resultado = "PERDISTE";
  }
  crearMensaje(resultado);
}

function crearMensaje(resultado) {
  let sectionMensaje = document.getElementById("mensajes");
  let parrafo = document.createElement("p");
  parrafo.innerHTML =
    "Tu mascota ataco con " +
    ataqueJugador +
    " y la mascota del enemigo ataco con " +
    ataqueEnemigo +
    " " +
    resultado +
    " ";
  sectionMensaje.appendChild(parrafo);
}

let botonMascota = document.getElementById("boton-mascota");
botonMascota.addEventListener("click", seleccionarMascotaJugador);

let botonFuego = document.getElementById("boton-fuego");
botonFuego.addEventListener("click", ataqueFuego);
let botonAgua = document.getElementById("boton-agua");
botonAgua.addEventListener("click", ataqueAgua);
let botonTierra = document.getElementById("boton-tierra");
botonTierra.addEventListener("click", ataqueTierra);
