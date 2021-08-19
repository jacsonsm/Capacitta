//console.log("Hello word")
const express = require('express')
const app = express()
const database = require('./dataBase')

app.get('/pokemons', (req, res) => {
    res.send(database.mostrarPokemons())
})

app.get('/pokemons/:id', (req, res) => {
    res.send(database.mostrarPokemon(req.params.id))
})

app.post('/pokemons', (req, res) => {
    const pokemon = database.salvarPokemons({
        nome: req.body.nome,
        tipo: req.body.tipo
    })
    res.send(pokemon)

})

app.listen(3003)