import './css/styles.css';
import Notiflix from 'notiflix';
import { PixabayApi } from './fetchImages';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formEl = document.querySelector('.search-form')
const loadMoreBtnEl = document.querySelector('.load-more')
const galleryEl = document.querySelector('.gallery')

const galleryLightbox = new SimpleLightbox('.gallery a', {
    captionDelay: '250',

});
 
loadMoreBtnEl.style.display = 'none';

formEl.addEventListener('submit', onSearchImages)
loadMoreBtnEl.addEventListener('click', onLoadMore)

const pixabayApi = new PixabayApi();
console.log(pixabayApi.per_page);

async function onSearchImages(event) {
    event.preventDefault();
    galleryEl.innerHTML = '';
    loadMoreBtnEl.style.display = 'none';
    pixabayApi.page = 1;
    

    const inputValue = event.target.searchQuery.value.trim();
    pixabayApi.q = inputValue;

        if (!inputValue) {
        Notiflix.Notify.info(`Please enter the data for the search query`)
        
        return
    }

    try {
        const photosResponce = await pixabayApi.fetchFotos()

              if (!photosResponce.data.totalHits) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
         return
        }   

        galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(photosResponce.data.hits));
        Notiflix.Notify.success(`Hooray! We found ${photosResponce.data.totalHits} images.`);
        loadMoreBtnEl.style.display = 'block';

        const totalPage = Math.ceil(photosResponce.data.totalHits / pixabayApi.per_page);

        if (totalPage === pixabayApi.page) {
            loadMoreBtnEl.style.display = `none`;
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
            
        }
   
    }
    catch (error) {
        console.log(error.message)

    }
    galleryLightbox.refresh();
}
    
async function onLoadMore(event) {
    pixabayApi.page += 1;
    
    try {
        const photosResponce = await pixabayApi.fetchFotos();
        galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(photosResponce.data.hits));
        galleryLightbox.refresh();

        const totalPage = Math.ceil(photosResponce.data.totalHits / pixabayApi.per_page);
        console.log('Результат', totalPage)

        
        if (totalPage === pixabayApi.page) {
            loadMoreBtnEl.style.display = `none`;
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
            
            
        }
        galleryLightbox.refresh();

        const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

        window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
});
    }
    catch (error) {
        console.log(error.message)
    }
}

function createGalleryCards(galleryCards) {
      return galleryCards.map(({ webformatURL, tags, likes, views, comments, downloads, largeImageURL }) => 
            `<a class="gallery__link" href="${largeImageURL}">
                <div class="photo-card">
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
                </div>
            </a>`
  
    ).join("");
}

