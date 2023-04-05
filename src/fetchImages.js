import axios from 'axios';
export class PixabayApi {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '35099720-4d8fe0d7f5adc4f66994afd08'

    page = 1;
    q = '';

    fetchFotos() {
        return axios.get(`${this.#BASE_URL}`, {
            params: {
            key:this.#API_KEY,
            q: this.q,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: this.page,
            perPage: '40',
          },
        });
    }
}
    
