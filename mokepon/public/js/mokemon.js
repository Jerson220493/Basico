// declaracion de constantes
const sectionseleccionarAtaque = document.getElementById("seleccionar_ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascota = document.getElementById("boton-mascota");
const botonReinicar = document.getElementById("boton-reiniciar");
const spanMascotaJugador = document.getElementById("masconta-jugador");
const sectionseleccionarMascota = document.getElementById("seleccionar_mascota");
const spanMascotaEnemigo = document.getElementById("masconta-enemigo");
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");
const sectionMensaje = document.getElementById("resultado");
const ataquesJugador = document.getElementById("ataques-jugador");
const ataquesEnemigo = document.getElementById("ataques-enemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contenedorAtaques = document.getElementById("contenedorAtaques");

const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById("mapa");

let jugadorId = null;
let enemigoId = null;
let ataqueEnemigo = [];
let vidasJugador = 3;
let vidasEnemigo = 3;
let mokepones = [];
let opcionDeMokepones = '';
let ataquesMokepon = '';
let ataquesMokeponEnemigo;

let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let ataqueJugador = [];
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./assets/mokemap.png";
let mascotaJugadorObjeto;
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
let anchoMaximoDelMapa = 350;
let mokeponesEnemigos = [];

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa-20
}

alturaQueBuscamos = anchoDelMapa*600 / 800;
mapa.width = anchoDelMapa;
mapa.height =alturaQueBuscamos;


class Mokepon {
  constructor(nombre, foto, vida, fotoMapa, id=null) {
    this.id = id,
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMokepon(){
    lienzo.drawImage(
      this.mapaFoto,
      this.x,
      this.y,
      this.ancho,
      this.alto
    )
  }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png');
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png');
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png');


const HIPODOGE_ATAQUES = [
  {nombre : '🧊', id : 'boton-agua'},
  {nombre : '🧊', id : 'boton-agua'},
  {nombre : '🧊', id : 'boton-agua'},
  {nombre : '🌱', id : 'boton-tierra'},
  {nombre : '🔥', id : 'boton-fuego'}
];

const CAPIPEPO_ATAQUES = [
  {nombre : '🌱', id : 'boton-tierra'},
  {nombre : '🌱', id : 'boton-tierra'},
  {nombre : '🌱', id : 'boton-tierra'},
  {nombre : '🧊', id : 'boton-agua'},
  {nombre : '🔥', id : 'boton-fuego'}
];

const RATIGUEYA_ATAQUES = [
  {nombre : '🔥', id : 'boton-fuego'},
  {nombre : '🔥', id : 'boton-fuego'},
  {nombre : '🔥', id : 'boton-fuego'},
  {nombre : '🌱', id : 'boton-tierra'},
  {nombre : '🧊', id : 'boton-agua'}
];

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)


mokepones.push(hipodoge, capipepo, ratigueya);

mokepones.forEach((mokepon) => {
  opcionDeMokepones = `        
  <input type="radio" name="mascota" id=${mokepon.nombre} />
  <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
    <p>${mokepon.nombre}</p>
    <img
      src=${mokepon.foto}
      alt=${mokepon.nombre}
    />
  </label>`;
  contenedorTarjetas.innerHTML += opcionDeMokepones;
} )

function seleccionarMascotaJugador() {
  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else {
    alert("No has seleccionado ninguo");
    return
  }

  seleccionarMokepon(mascotaJugador)

  extraerAtaques(mascotaJugador);
  sectionseleccionarMascota.style.display = "none";

  /*aca agragamos el mapa */
  sectionVerMapa.style.display ="flex";
  iniciarMapa()
}

function seleccionarMokepon(mascotaJugador){
  fetch("http://localhost:8080/mokepon/"+jugadorId, {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      mokepon : mascotaJugador
    })
  })
}

function extraerAtaques(mascotaJugador){
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mokepones[i].nombre == mascotaJugador) {
     ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques){
  ataques.forEach((ataque) => {
    ataquesMokepon = `
      <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button> 
    `;
    contenedorAtaques.innerHTML += ataquesMokepon;
  })
  botonFuego = document.getElementById("boton-fuego");
  botonAgua = document.getElementById("boton-agua");
  botonTierra = document.getElementById("boton-tierra");
  botones = document.querySelectorAll(".BAtaque");

}

function secuenciaAtaque(){
  // console.log(botones)
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥" ) {
        ataqueJugador.push('FUEGO');
        boton.style.background = "#112f58";
        boton.disabled = true;
      }
      if (e.target.textContent === "🧊" ) {
        ataqueJugador.push('AGUA');
        boton.style.background = "#112f58";
        boton.disabled = true;
      }
      if (e.target.textContent === "🌱" ) {
        ataqueJugador.push('TIERRA');
        boton.style.background = "#112f58";
        boton.disabled = true;
      }
      if (ataqueJugador.length === 5) {
        enviarAtaques();
      }
    })
  })
}


function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length-1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("FUEGO");
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("AGUA");
  } else {
    ataqueEnemigo.push("TIERRA");
  }
  iniciarPelea();

}

function iniciarPelea(){
  if (ataqueJugador.length == 5) {
    combate();
  }
}

function indexAmbosOponentes(jugador, enemigo){
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
  clearInterval(intervalo);
  for (let i = 0; i < ataqueJugador.length; i++) {
    if (ataqueJugador[i] == ataqueEnemigo[i]) {
      indexAmbosOponentes(i, i)
      crearMensaje("EMPATE");
    }
    else if(ataqueJugador[i] == "FUEGO" && ataqueEnemigo[i] == "TIERRA"){
      indexAmbosOponentes(i, i);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    }
    else if(ataqueJugador[i] == "AGUA" && ataqueEnemigo[i] == "FUEGO"){
      indexAmbosOponentes(i, i);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    }
    else if(ataqueJugador[i] == "TIERRA" && ataqueEnemigo[i] == "AGUA"){
      indexAmbosOponentes(i, i);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    }
    else{
      indexAmbosOponentes(i, i);
      crearMensaje("PERDISTE");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
  }
  revisarVidas();
}

function revisarVidas() {
  if (victoriasJugador == victoriasEnemigo) {
    crearMensajeFinal("Esto fue un empate");
  } 
  else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("FELICITACIONES! Ganaste");
  }
  else{
    crearMensajeFinal("Lo siento perdiste :(");
  }
}

function crearMensaje(resultado) {
  let nuevoAtaqueJugador = document.createElement("p");
  let nuevoAtaqueEnemigo = document.createElement("p");

  sectionMensaje.innerHTML = resultado;
  nuevoAtaqueJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo;

  ataquesJugador.appendChild(nuevoAtaqueJugador);
  ataquesEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensaje.innerHTML = resultadoFinal;
  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

function pintarCanvas (){

  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
  lienzo.clearRect(0,0,mapa.width, mapa.height)
  lienzo.drawImage(
    mapaBackground,
    0,
    0,
    mapa.width,
    mapa.height
  )
  mascotaJugadorObjeto.pintarMokepon();
  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

  mokeponesEnemigos.forEach(function (mokepon){
    mokepon.pintarMokepon()
    revisarColision(mokepon)
  })
}

function moverDerecha(){
  mascotaJugadorObjeto.velocidadX = 5;
}

function moverIzquierda(){
  mascotaJugadorObjeto.velocidadX = -5;
}

function moverArriba(){
  mascotaJugadorObjeto.velocidadY = -5;

}

function moverAbajo(){
  mascotaJugadorObjeto.velocidadY = 5;
}

function detenerMovimiento(){
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionaUnaTecla(event){
  switch (event.key) {
    case "ArrowUp":
      moverArriba()
      break;
    case "ArrowDown":
        moverAbajo()
        break;
    case "ArrowLeft":
      moverIzquierda()
        break;
    case "ArrowRight":
      moverDerecha()
      break;
    default:
      break;
  }
}

function iniciarMapa(){

  mascotaJugadorObjeto = obtenerObjetoMascota();
  pintarCanvas();
  intervalo = setInterval(pintarCanvas, 50);
  // funciones para hacer movimientos con el teclado
  window.addEventListener('keydown', sePresionaUnaTecla);
  window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota(){
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mokepones[i].nombre == mascotaJugador) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo){
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const izquierdaMascota = mascotaJugadorObjeto.x;
  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
    ) {
    return
  }
  detenerMovimiento();
  clearInterval(intervalo);
  sectionseleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = 'none';
  seleccionarMascotaEnemigo(enemigo);
  enemigoId = enemigo.id;
}

function uniserAlJuego(){
  fetch("http://localhost:8080/unirse")
    .then(function (res) {
      if (res.ok) {
        res.text()
          .then(function(respuesta) {
            console.log(respuesta)
            jugadorId = respuesta;
          })
      }
    })
}

function enviarPosicion(x, y){
  fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
    method : "post",
    headers : {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      x,
      y
    })
  })
  .then(function(res){
    if (res.ok) {
      res.json()
      .then(function({enemigos}){
        mokeponesEnemigos = enemigos.map(function(enemigo){
          let mokeponEnemigo = null;
          let mokeponNombre = enemigo.mokepon.nombre || "";
          if ( mokeponNombre === "Hipodoge" ) {
            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id);
          }
          else if(mokeponNombre === "Capipepo"){
            mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id);
          }
          else if(mokeponNombre === "Ratigueya"){
            mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id);
          }
          console.log(mokeponEnemigo)
          mokeponEnemigo.x = enemigo.x;
          mokeponEnemigo.y = enemigo.y;
          return mokeponEnemigo

        })  
      })
    }
  })
}


function enviarAtaques(){
  fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
    method : 'post',
    headers : {
      "Content-Type" : "application/Json"
    },
    body : JSON.stringify({
      ataques : ataqueJugador
    })
  })

  intervalo = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques(){
  fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
  .then(function (res){
    if (res.ok) { console.log(res)
      res.json()
        .then(function({ataques}){ console.log(ataques)
          if (ataques.length === 5) {
            ataqueEnemigo = ataques
            combate()
          }
        })
    }
  })
}

inputHipodoge = document.getElementById("Hipodoge");
inputCapipepo = document.getElementById("Capipepo");
inputRatigueya = document.getElementById("Ratigueya");

sectionseleccionarAtaque.style.display = "none";
sectionReiniciar.style.display = "none";
sectionVerMapa.style.display = "none";
botonMascota.addEventListener("click", seleccionarMascotaJugador);


/*** boton reiniciar ***/
botonReinicar.addEventListener("click", reiniciarJuego);

uniserAlJuego();
