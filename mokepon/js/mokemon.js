let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

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
  let sectionseleccionarAtaque = document.getElementById("seleccionar_ataque");
  sectionseleccionarAtaque.style.display = "block";
  let sectionseleccionarMascota = document.getElementById(
    "seleccionar_mascota"
  );
  sectionseleccionarMascota.style.display = "none";
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
  let spanVidasJugador = document.getElementById("vidas-jugador");
  let spanVidasEnemigo = document.getElementById("vidas-enemigo");
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
  if (resultado == "PERDISTE") {
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
  } else if (resultado == "GANASTE") {
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  }
  crearMensaje(resultado);
  revisarVidas();
}

function revisarVidas() {
  let mensaje = "";
  if (vidasEnemigo == 0) {
    mensaje = "Felicitaciones ganaste :)";
    crearMensajeFinal(mensaje);
  } else if (vidasJugador == 0) {
    mensaje = "Lo siento perdiste :(";
    crearMensajeFinal(mensaje);
  }
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

function crearMensajeFinal(resultadoFinal) {
  let sectionMensaje = document.getElementById("mensajes");
  let parrafo = document.createElement("p");
  parrafo.innerHTML = resultadoFinal;
  sectionMensaje.appendChild(parrafo);
  let botonFuego = document.getElementById("boton-fuego");
  botonFuego.disabled = true;
  let botonAgua = document.getElementById("boton-agua");
  botonAgua.disabled = true;
  let botonTierra = document.getElementById("boton-tierra");
  botonTierra.disabled = true;

  let sectionReiniciar = document.getElementById("reiniciar");
  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

let sectionseleccionarAtaque = document.getElementById("seleccionar_ataque");
sectionseleccionarAtaque.style.display = "none";

let sectionReiniciar = document.getElementById("reiniciar");
sectionReiniciar.style.display = "none";

let botonMascota = document.getElementById("boton-mascota");
botonMascota.addEventListener("click", seleccionarMascotaJugador);

/*** botones ataques *******/
let botonFuego = document.getElementById("boton-fuego");
botonFuego.addEventListener("click", ataqueFuego);
let botonAgua = document.getElementById("boton-agua");
botonAgua.addEventListener("click", ataqueAgua);
let botonTierra = document.getElementById("boton-tierra");
botonTierra.addEventListener("click", ataqueTierra);

/*** boton reiniciar ***/
let botonReinicar = document.getElementById("boton-reiniciar");
botonReinicar.addEventListener("click", reiniciarJuego);
