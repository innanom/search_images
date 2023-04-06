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
// loadMoreBtnEl.addEventListener('click', onLoadMore)

const pixabayApi = new PixabayApi();

function onSearchImages(event) {
    event.preventDefault();
    // loadMoreBtnEl.style.display = 'none';
    galleryEl.innerHTML = '';

    const searchQuery = event.target.elements[0].value.trim();
    pixabayApi.q = searchQuery;

    pixabayApi.fetchFotos()
//         .then(data => console.log(data))
// }
        .then(data => galleryEl.insertAdjacentElement('beforeend', createGalleryCards(data.hits)))
    .catch(error =>  
            console.log(error.message))
    }

  function createGalleryCards(galleryCards) {
      return galleryCards.map(({ webformatURL, tags, likes, views, comments, downloads, largeImageURL }) => 
             `<a class="gallery__link" href="${largeImageURL}">
             <div class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
                    </div>
                </a>`
        
    ).join("");
}

// function onLoadMore(event) {
   
//     pixabayApi.q = event.target.value;

// pixabayApi.fetchFotos().then(r => console.log(r).catch(consol.log(error.message)))
// }