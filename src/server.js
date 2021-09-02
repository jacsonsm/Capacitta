// PARA IMPORTAR O Express
const express = require('express');

// PARA INICIAR O Express
const app = express();

// PARA IMPORTAR O dataBase,js
const dataBase = require('./database/dataBaseKnex');
// PARA IMPORTAR O  Body-parser 
const bodyParser = require('body-parser');

// UPARA USAR O body-parser 
app.use(bodyParser.urlencoded({ extended: true }))


// REQUISIÇÃO GET 
// A rota '/pokemons', uma vez acessada devolve como resposta o retorno do método .send()
app.get('/pokemons', async (req, res) => { //(requisição) / (resposta)
    res.send(await dataBase.mostrarPokemons())
});

// REQUISIÇÃO GET PARA MOSTRAR UM POKEMON
app.get('/pokemons/:id', async (req, res) => {
    res.send(await dataBase.mostrarPokemon(req.params.id))
});

// REQUISIÇÃO POST PARA SALVAR UM POKEMON
app.post('/pokemons', async (req, res) => {
    const pokemon = await dataBase.salvarPokemons({
        nome: req.body.nome,
        tipo: req.body.tipo,
        origem: req.body.origem,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: req.body.hp
    })
    res.send(pokemon)
});
// REQUISIÇÃO PUT PARA ATUALIZAR UM POKEMON
app.put('/pokemons/:id', async (req, res) => {
    const pokemon = await dataBase.atualizarPokemon(req.params.id, {
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: req.body.hp,
        id: parseInt(req.params.id)
    })

    res.send(pokemon)
});

//REQUISIÇÃO DELETE PARA DELETAR POKEMONS 
app.delete('/pokemons/:id', async (req, res) => {
    res.send(await dataBase.deletarPokemon(req.params.id))
})

//REQUISIÇAO POST DA BATALHA
app.post('/batalha', (req, res) => {
    res.send(dataBase.batalhaPokemon(req.body.id1, req.body.id2))
});

//REQUISIÇÃO PUT PARA ALIMENTAR POKEMON
//app.put('/pokemons/:id', (req, res) => {
//    const pokemon = dataBase.curarPokemon(req.params.id, {
//        id: parseInt(req.params.id)
//    })
//
//    res.send(pokemon)
//});
/*app.put('/curar/', (req, res) => {
    const pokemon = dataBase.curarPokemon(req.params.id, {
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: parseInt(req.params.hp),
        id: req.body.id
    })

    res.send(pokemon)
});*/


// NUMERO DA PORTA PARA O BROWSER
app.listen(3003);