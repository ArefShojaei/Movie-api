const api = {
    url : "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=",
    img_path : "https://image.tmdb.org/t/p/w1280"
}


const input = document.querySelector("input")
const btn = document.querySelector("button")
const movieItems = document.querySelector(".movie__items")


const getMovies = async(query) =>{

    try{
        const response = await fetch(query)
        const data = await response.json()
        return data
    }catch(err){
        console.log(err);
    }

}

const showData = (data) =>{
    movieItems.innerHTML = null

    data.forEach(item => {
        const { poster_path , vote_average , title } = item

        const img_src  = api.img_path + poster_path

        const card = `<div class="card">
            <div class="card__image"> <img src="${img_src}" alt="poster"> </div>
            <div class="card__content">
                <div class="rate">
                    <div class="icon"> <img src="./assets/images/icons/star-icon.svg" alt=""> </div>
                    <p>${vote_average}</p>
                </div>
                <h3>${title}</h3>
            </div>
        </div>`
    
        movieItems.innerHTML += card
    });
}


btn.addEventListener("click",e=>{
    e.preventDefault()
    if(!input.value == ''){

        const inputVal = input.value

        const newQuery = api.url + inputVal
    
        getMovies(newQuery)
            .then(data => showData(data.results))
            .catch(err => console.log(err))

    }else{
        alert("Please Enter a value in This input")
    }

    input.value = null

})