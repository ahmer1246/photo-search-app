const accessKey = 'UR4ZZkdvkoTXEekMgULL0X8HfQjtuGqrnKqAB_RXeec'
const searchForm  =document.querySelector('form');
const imagesContainer =document.querySelector('.images-container');
const searchInput =document.querySelector('.search-input');
const loadMoreBtn =document.querySelector('.loadMoreBtn')
let page =1;
// ---function to fetch images using unsplash api---


 const fetchImages = async (query,pageNo)=>{
    if(pageNo=== 1){
        imagesContainer.innerHTML = " ";
    }
   
    const url =`https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    
    // console.log(data);
    data.results.forEach(photo => {
        const imageElement =document.createElement('div');
        imageElement.classList.add('imageDiv')
        imageElement.innerHTML=`<img src="${photo.urls.regular}"/>`;



//  ------ Creating overlayElement ------- //

        const overlayElement =document.createElement('div');
        overlayElement.classList.add('overlay');



    // -----Creating overlay Text ------  

    const overlayText =document.createElement('h3');
    overlayText.innerText = `${photo.alt_description}`;

    overlayElement.appendChild(overlayText)



        imageElement.appendChild(overlayElement);
        imagesContainer.appendChild(imageElement);
    });
 
}

// ---addEventListener for searchinput----

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if(inputText!== ''){
        let page =1;
        fetchImages(inputText,page);

    }
    else{
        imagesContainer.innerHTML = `<h2> Please enter a search query.</h2>`
    }
})



// Adding Event listener to load more btn

loadMoreBtn.addEventListener('click',()=>{
  fetchImages(searchInput.value.trim(), ++page)
})