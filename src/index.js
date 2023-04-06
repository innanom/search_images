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

function onSearchImages(event) {
    event.preventDefault();
    // loadMoreBtnEl.style.display = 'none';
    galleryEl.innerHTML = '';

    const searchQuery = event.target.elements[0].value.trim();

    pixabayApi.q = searchQuery;
    pixabayApi.fetchFotos().then(data => galleryEl.insertAdjacentElement('beforeend', createGalleryCards(data.hits)));
    


}

// function onLoadMore(event) {
   
//     pixabayApi.q = event.target.value;

// pixabayApi.fetchFotos().then(r => console.log(r).catch(consol.log(error.message)))
// }