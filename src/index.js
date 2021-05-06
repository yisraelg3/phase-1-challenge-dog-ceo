console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', (event) => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    const imgContainer = document.querySelector('div#dog-image-container')
    const breedUl = document.querySelector('ul#dog-breeds')
    const selection = document.querySelector('select#breed-dropdown')
    
    fetchDogImages(imgUrl)
    fetchDogBreeds(breedUrl)



function fetchDogImages (url) {
    fetch(url)
    .then(res => res.json())
    .then(imgArray => {
        //console.log(imgArray)
        imgArray.message.forEach((img) => appendImgToDOM(img))
    })
}

function fetchDogBreeds(url) {
    fetch(url)
    .then(res => res.json())
    .then( (breedObj) => {
        //console.log(breedObj.message)
        for (const [key, value] of Object.entries(breedObj.message)) {
            appendLiToDOM(key, value)
        }
        selection.addEventListener('change',(event) =>  filterBreeds(event,breedObj.message))
    })
}

function appendImgToDOM(item) {
    const img = document.createElement('img')
    img.src= item 
    imgContainer.appendChild(img)
}

function appendLiToDOM(key, value) {
    const keyLi = document.createElement('li')
    keyLi.innerText = key
    value.forEach((element) =>  {
        const subUl = document.createElement('ul')
        const valueLi = document.createElement('li')
        valueLi.innerText = element
        subUl.appendChild(valueLi)
        keyLi.appendChild(subUl) 
        valueLi.addEventListener('click', (event) => changeColor(event))   
    })
    breedUl.appendChild(keyLi)
    keyLi.addEventListener('click', (event) => changeColor(event))   
}

function changeColor (event) {
    event.target.style.color = 'rgb(238,130,238)'
}

function filterBreeds (event, breedArray) {
    const filteredBreeds = {}
    
    for (const [key, value] of Object.entries(breedArray)) {
       if (key[0] === event.target.value){
        //console.log({[key]:value})
         Object.assign(filteredBreeds,{[key]:value})
        }
    }
    breedUl.innerHTML = ''
    for (const [key, value] of Object.entries(filteredBreeds)) {
        appendLiToDOM(key, value)
    }
    //console.log(filteredBreeds)
}
})