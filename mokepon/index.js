import express from "express";
import cors from "cors";

const app = express(); // cramos la instancia del servidor

app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id;
    }
}

app.get("/unirse", (req, res)=>{
    const id = `${Math.random()}`
    const jugador = new Jugador(id);
    jugadores.push(jugador)
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) =>{
    const jugadorId = req.params.jugadorId || ""
    console.log(jugadores);
    console.log(jugadorId);
    res.end();
})

app.listen(8080, ()=>{
    console.log("Servidor funcionando");
})
