import EdamamKeys from '../../constants/EdamamKeys';

const EdamamPull = class {
  constructor(searchText = '') {
    this.searchText = encodeURI(searchText);
    this.result = '';

    this.rootURL = 'https://api.edamam.com/api/food-database/';
    this.urlParams = URLSearchParams(`ingr=${searchText}&app_id=${EdamamKeys.foodAppId}&app_key=${EdamamKeys.foodAppKey}`)
  }
  searchFood(searchText) {
    this.searchText = searchText;

    this.urlParams = URLSearchParams();
    this.uriParams.append('', 'value');
  }

  async getJson(url) {
    const response = await fetch(url, {
      method: 'GET',
    })
  }

  async postJson(url) {
    const response = await fetch(url, {
      method: 'POST',
      body: data
    })
  }
}

export default EdamamPull;
