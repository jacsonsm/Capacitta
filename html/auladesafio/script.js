const listarFilmes = async function () {
    //let xhttp = new XMLHttpRequest()
    let filmes = document.getElementById('filmes')
    filmes.innerHTML = ""
    let urls = []

    for (let i = 0; i < 10; i++) {
        urls.push(`https://api.themoviedb.org/3/movie/550?api_key=81e2bb88afb9e6ce76ecaaf5113f3004${i + 1}`)
    }

    //let responses = []
    let promises = []
    urls.forEach((url) => {
        promises.push(
            fetch(url, { method: 'get', mode: 'cors', cache: 'default' })
                .then((res) => res.json())
                .then((data) => data)
        )
    })

    const responses = await Promise.all(promises)


    urls.forEach((url) => {
        //xhttp.open('get', url, false)
        //xhttp.send()
        //responses.push(JSON.parse(xhttp.responseText))
    })

    responses.forEach((filme) => {
        let nodeId = filme.id

        let img = document.createElement('img')
        img.src = filme.poster_path
        img.className = 'img-fluid img-thumbnail'

        let xicon = document.createElement('i')
        xicon.className = 'bi bi-x-square'
        xicon.onclick = function () {
            filmes.removeChild(document.getElementById(nodeId))
        }


        let id = document.createElement('p')
        id.innerHTML = `ID:${filme.id} Nome: ${filme.title}`

        let div = document.createElement('div')
        div.className = 'col card bg-light'
        div.id = nodeId

        div.appendChild(id)
        div.appendChild(img)
        div.appendChild(xicon)

        filmes.appendChild(div)
    })
}