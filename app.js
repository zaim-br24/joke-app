const DOM = {
    container:document.getElementById('container'),
    jokeText:document.getElementById('joke'),
    author:document.getElementById('author'),
    lang:document.getElementById('select-lang'),
    newJokeBtn:document.getElementById('new-joke-btn'),
    loader:document.getElementById('loader')

};

// show loader
function loading(){
    DOM.container.hidden = true;
    DOM.loader.hidden =false;   
}
// complete
function complete(){
    DOM.container.hidden = false;
    DOM.loader.hidden =true;
}

async function getJokeData(type){
   loading()
    try{
        const url = `https://sv443.net/jokeapi/v2/joke/Miscellaneous,Dark,Pun?lang=${type}&blacklistFlags=nsfw,religious,political,racist&type=single&`;
        const response = await fetch(url);
        const data = await response.json();
        displayJoke(data)
        complete()
    }catch(error){
        console.log('whooops no joke ' , error)
    }
    
}
DOM.newJokeBtn.addEventListener('click',()=>{
    if(DOM.lang.value === 'en'){
        getJokeData('en')
    }else if(DOM.lang.value === 'de'){
        getJokeData('de')
    }else if(DOM.lang.value === 'ru'){
        getJokeData('ru')
    }else if(DOM.lang.value === 'cs'){
        getJokeData('cs')
    }

})

getJokeData(DOM.lang.value)

function displayJoke(data){
    if(data.joke.length > 120){
        DOM.jokeText.classList.add('smaller')
    }else{
        DOM.jokeText.classList.remove('smaller')
    }
    DOM.jokeText.innerText = data.joke
}