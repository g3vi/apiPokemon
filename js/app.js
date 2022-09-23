console.log('conectando...')
const lista=document.getElementById('Lista')
const infoPokemon=document.getElementById('infoPokemon').content
const fragment=document.createDocumentFragment()
//Elementos del Filtro
const btnFiltro=document.getElementById('btnFiltrar')
const input=document.getElementById('filtroPokemon')
let pokemones=[]
let pokemonBuscado=[]
document.addEventListener('DOMContentLoaded',()=>{
    fetchPokemones()
})

btnFiltro.addEventListener('click',()=>{
    if(input.value>0 && input.value)
    {
        console.log('click en el filtro',input.value)
        fetchPokemones(input.value)
    }
})

lista.addEventListener('click',e=>{
    if(e.target.classList.contains('btn-dark')){
        const id=e.target.dataset.id
        fetchPokemonBuscado(id)
    }
})

const fetchPokemonBuscado=id=>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(async(res)=>{
        //console.log(await res.json())
        pokemonBuscado=await res.json()
        const pokemon={
            nombre: pokemonBuscado.name,
            experiencia: pokemonBuscado.base_experience,
            hp: pokemonBuscado.stats[0].base_stat,
            ataque: pokemonBuscado.stats[1].base_stat,
            defensa : pokemonBuscado.stats[2].base_stat,
            especial: pokemonBuscado.stats[3].base_stat,
            imgJuego: pokemonBuscado.sprites.front_default,
            imgCvg: pokemonBuscado.sprites.other.dream_world.front_default,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonBuscado.id}.png`
        }
        console.log('pokemon',pokemon)
        pintarPokemon(pokemon)
        
    })
    .catch(error=>{
        console.log(error)
    })
}

const pintarPokemon=pokemon=>{
    const pokemonBuscado=document.getElementById('pokemonBuscado')
    const template=document.getElementById('card').content
    const clone=template.cloneNode(true)
    const fragment=document.createDocumentFragment()
    pokemonBuscado.innerHTML=''
    clone.querySelector('.card-body-img').setAttribute('src',pokemon.imgCvg)
    clone.querySelector('.card-body-title')
    .innerHTML=`${pokemon.nombre}<span> ${pokemon.hp}Hp ${pokemon.experiencia}Exp</span>`
    //clone.querySelector('.card-body-text').textContent = pokemon.experiencia + "exp"
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + "K"
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial + "K"
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defensa + "K"
    fragment.appendChild(clone)
    console.log('jk',clone,fragment)
    pokemonBuscado.appendChild(fragment)
}

const fetchPokemones= (total)=>{
    const limit=total||2000
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
    .then(async res=>{
        pokemones=[]
        let data=await res.json()
        pokemones=await data.results
        pintarPokemones()
    })
    .catch(error=>{
        console.log('error',error)
    })
}

const pintarPokemones=(array)=>{
    const pinta=array||pokemones
    let i=-1
    if(array){
        i=pokemones.findIndex(x=>x.name===array[0].name)
        i++
    }
    lista.innerHTML=''
    pinta.forEach((item, index)=>{
        //console.log(item)
        infoPokemon.querySelectorAll('p')[0].textContent=item.name
        infoPokemon.querySelectorAll('p')[1].textContent=item.url
        infoPokemon.querySelector('button').dataset.id= i != -1 ? i : index+1
        const clone=infoPokemon.cloneNode(true)
        fragment.appendChild(clone)
    })
    lista.appendChild(fragment)
}
const buscaPorNombre=e=>{
    const busca=document.getElementById('buscaNombre').value
    //console.log('data',busca,pokemones)
    const resultado=pokemones.find(obj=>{
        //console.log(obj)
        if(obj.name === busca){
            return obj
        }
    })
    if(resultado){
        let poke=[]
        poke.push(resultado)
        pintarPokemones(poke)
    }else{
        pintarPokemones()
    }
    //console.log('resultado',resultado)
}