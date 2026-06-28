// document.getElementById("search-btn").addEventListener("click",searchMovies);

let timer=0;
let apiKey="8d147048";
  let favorites=JSON.parse(localStorage.getItem("favorites"))||[];

  document.getElementById("search-input").addEventListener("input",searchMovies);


function searchMovies(){
  clearTimeout(timer);
  timer=setTimeout(function(){
    let movieName=document.getElementById("search-input").value;
  let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieName)}`;

  document.getElementById("result").innerHTML=
  "<P class='loading'>Loading...</P>"

fetch(url)
.then(response=>response.json())
.then(data=>{
  //console.log(data);
  document.getElementById("result").innerHTML="";//clear old results
  if(data.Response==="False"){
    document.getElementById("result").innerHTML=
    "<p style='font-size:30px;color:#791F1F; '>No movies found.Try Another !</p>";
    return;
  }


 data.Search.map(function(movie){
  let card=document.createElement("div");
  card.classList.add("movie-card");
  console.log(movie.Title);

  card.innerHTML=`<img src="${movie.Poster}">
  <h3>${movie.Title}</h3>
  <p>${movie.Year}</p>
  <button class="fav-btn">❤️</button>`;
  
card.addEventListener("click",function(){
  getMovieDetails(movie.imdbID);
    });
 card.querySelector(".fav-btn").addEventListener("click",function(e){
    e.stopPropagation();
    addTofavorites(movie);
  
    });
  

  document.getElementById("result").appendChild(card);
   });
});
},500);
}

 function getMovieDetails(id){
  let url=`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
  fetch(url)
  .then(response=>response.json())
    .then(data=>{
      //console.log(data);

      document.getElementById("movie-details").innerHTML=
      `<img src="${data.Poster}">
<h2>${data.Title}</h2>
<p>${data.Plot}</p>
<p>⭐${data.imdbRating}</p>
`;
    });
  
  }


function addTofavorites(movie){

  let alreadyexists=favorites.find(function(fav){
    return fav.imdbID===movie.imdbID;
  });
if(alreadyexists){
  alert("Already in favorites");
return;}
  favorites.push(movie);
  localStorage.setItem("favorites",JSON.stringify(favorites));
  displayFavorites();
  localStorage.removeItem("favorites");
}
function displayFavorites(){
  document.getElementById("favorites").innerHTML="";
  if(favorites.length==0){
  document.getElementById("favorites").innerHTML=
    "<p style='font-size:20px;color:#791F1F; '>Nothing here yet! Search a movie and tap ❤️ to add it....</p>";
    return;
  }
  favorites.map(function(movie){
let card=document.createElement("div");
  card.classList.add("movie-card");
  console.log(movie.Title);

  card.innerHTML=`<img src="${movie.Poster}">
  <h3>${movie.Title}</h3>
  <p>${movie.Year}</p>`;
  document.getElementById("favorites").appendChild(card);

  //to remove from fav
  card.innerHTML=`<img src="${movie.Poster}">
  <h3>${movie.Title}</h3>
  <p>${movie.Year}</p>
  <button class="remove-btn">❌</button>
  `;
  card.querySelector(".remove-btn").addEventListener("click",function(){
    removeFromFavorites(movie.imdbID);
  });

  });
}
function removeFromFavorites(id){
  favorites=favorites.filter(function(movie){
    return movie.imdbID!==id;
  });
  localStorage.setItem("favorites",JSON.stringify(favorites));
  displayFavorites();
}