import './css/styles.css';
import Notiflix from 'notiflix';
import { PixabayApi } from './fetchImages';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formEl = document.querySelector('.search-form')
const inputEl = document.querySelector('[name="searchQuery"]')
const submitBtnEl = document.querySelector('button[type="submit"]')
const loadMoreBtnEl = document.querySelector('.load-more')
const galleryEl = document.querySelector('.gallery')

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: '250',

});
 
loadMoreBtnEl.style.display = 'none';

formEl.addEventListener('submit', onSearchImages)
loadMoreBtnEl.addEventListener('click', onLoadMore)

const pixabayApi = new PixabayApi();
console.log(pixabayApi.fetchFotos());

async function onSearchImages(event) {
    event.preventDefault();
    galleryEl.innerHTML = '';
    loadMoreBtnEl.style.display = 'none';
    pixabayApi.page = 1;
    

    const inputValue = event.target.searchQuery.value.trim();
    pixabayApi.q = inputValue;

    try {
        const photosResponce = await pixabayApi.fetchFotos()
        galleryEl.innerHTML = createGalleryCards(photosResponce.data.hits)
        Notiflix.Notify.success(`Hooray! We found ${photosResponce.data.totalHits} images.`);
        loadMoreBtnEl.style.display = 'block';
        
    }
    catch (error) {
        console.log(error.message)

    }
    
}
    
async function onLoadMore(event) {
    pixabayApi.page += 1;
    
    try {
        const photosResponce = await pixabayApi.fetchFotos()  
        galleryEl.innerHTML = createGalleryCards(photosResponce.data.hits)
        
        if (!photosResponce.data.hits.length) {
            loadMoreBtnEl.style.display = `none`;
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
            
            return
        }
        
    }
    catch (error) {
        console.log(error.message)
    }
    
      
}


  function createGalleryCards(galleryCards) {
      return galleryCards.map(({ webformatURL, tags, likes, views, comments, downloads, }) => 
            //  `<a class="gallery__link" href="${largeImageURL}", largeImageURL>
            `<div class="photo-card">
                    <img class="gallery__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                        <b>Likes ${likes}</b>
                        </p>
                        <p class="info-item">
                        <b>Views ${views}</b>
                        </p>
                        <p class="info-item">
                        <b>Comments ${comments}</b>
                        </p>
                        <p class="info-item">
                        <b>Downloads ${downloads}</b>
                        </p>
                    </div>
                    </div>`
                // </a>`
        
    ).join("");
}

