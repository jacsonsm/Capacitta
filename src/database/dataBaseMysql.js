//Realizando o require da conexão criada
const { databaseConnection } = require('./connection')

//O id é incrementado automaticamente (Foi substituido pelo banco de dados)
/*const sequence = {
    _id: 1,
    get id() { return this._id++ }
}*/

// recebe vazio pois nã há nenhum cadastro no momento

const pokemons = {}

// salva um novo pokemon na base de dados
async function salvarPokemons(pokemon) {
    /*
    pokemon=={
        nome:'Pikachu',
        tipo: 'Eletrico'
    }
    */
    const queryInsertPokemon = `INSERT INTO pokemons( nome, tipo, origem, resistencia, fraqueza, hp) VALUES ('${pokemon.nome}','${pokemon.tipo}', '${pokemon.origem}', '${pokemon.resistencia}','${pokemon.fraqueza}', '${pokemon.hp}')`

    const result = await databaseConnection.raw(queryInsertPokemon)

    console.log(result)

    if (result) {
        return {
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            origem: pokemon.origem,
            resistencia: pokemon.resistencia,
            fraqueza: pokemon.fraqueza,
            hp: pokemon.hp,
            id: result[0].insertId
        }
    } else {
        console.error("Erro ao salvar")
        return {
            error: "Erro ao inserir o cadastro"
        }
    }
}

// Mostrar pokemon pesquisando por id 
async function mostrarPokemon(id) {

    const querySelectPokemon = `SELECT * FROM pokemons WHERE id=${id}`

    const result = await databaseConnection.raw(querySelectPokemon)

    return result[0]

}

// Mostrar todos os Pokemons cadastrados
async function mostrarPokemons() {
    const querySelectPokemon = `SELECT * FROM pokemons`

    const result = await databaseConnection.raw(querySelectPokemon)

    return result[0]
}

// Atualizar um pokemon salvo
function atualizarPokemon(id, pokemon) {
    pokemons[id] = pokemon
    return pokemon
}

//FUnçao para deletar 
function deletarPokemon(id) {
    sequence._id = sequence._id - 1
    const pokemonDeletado = pokemons[id]
    pokemons.splice(id, 1)
    pokemons.forEach(pokemon => {
        if (pokemon.id > id) {
            pokemon.id = pokemon.id - 1
        }
    })
    return pokemonDeletado
}

function batalhaPokemon(id1, id2) {
    const superEfetivo = 40
    const efetivo = 20
    const naoEfetivo = 10

    const pokemon1 = pokemons[id1]
    const pokemon2 = pokemons[id2]

    if (pokemon1.hp != 0 && pokemon2.hp != 0) {
        if (pokemon1.tipo == pokemon2.fraqueza) {
            pokemon2.hp = pokemon2.hp - superEfetivo
        } else if (pokemon1.tipo == pokemon2.resistencia) {
            pokemon2.hp = pokemon2.hp - naoEfetivo
        } else {
            pokemon2.hp = pokemon2.hp - efetivo
        }
    }
    if (pokemon1.hp != 0 && pokemon2.hp != 0) {
        if (pokemon2.tipo == pokemon1.fraqueza) {
            pokemon1.hp = pokemon1.hp - superEfetivo
        } else if (pokemon2.tipo == pokemon1.resistencia) {
            pokemon1.hp = pokemon1.hp - naoEfetivo
        } else {
            pokemon1.hp = pokemon1.hp - efetivo
        }
    }

    if (pokemon1.hp < 0) pokemon1.hp = 0
    if (pokemon2.hp < 0) pokemon2.hp = 0

    // function curarPokemon(id, pokemon) {
    //     pokemons[id] = pokemon
    //     const pocao = 20
    //     const pokemonCurado = pokemons[id]
    //
    //     if (pokemon.hp >= 0 && pokemon.hp <= 100) {
    //        pokemon.hp = pokemon.hp + pocao
    //     }
    //    return pokemonCurado
    //}
    /*function curarPokemon(id) {
        const pokemonCurado = pokemons[id]
        if (pokemon1.hp < 100 || pokemon2.hp < 100) {
            pokemonCurado = (pokemons.hp) + 20
        }
        if (pokemon1.hp > 100) pokemon1 = 100
        if (pokemon2.hp > 100) pokemon2 = 100

        return pokemonCurado
    }*/

    return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`

}

// criando um módulo para deixar os métodos visíveis para outros arquivos
module.exports = { salvarPokemons, mostrarPokemon, mostrarPokemons, atualizarPokemon, deletarPokemon, batalhaPokemon }