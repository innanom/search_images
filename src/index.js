import './css/styles.css';
import Notiflix from 'notiflix';
import { PixabayApi } from './fetchImages';

const formEl = document.querySelector('.search-form')
const inputEl = document.querySelector('[name="searchQuery"]')
const submitBtnEl = document.querySelector('button[type="submit"]')
const loadMoreBtnEl = document.querySelector('.load-more')
const galleryEl = document.querySelector('.gallery')

console.log(inputEl)

formEl.addEventListener('submit', onSearch)
loadMoreBtnEl.addEventListener('click', onLoadMore)

const pixabayApi = new PixabayApi();

function onSearch(event) {
    event.preventDefault();


}


function onLoadMore(event) {
    event.preventDefault();


}