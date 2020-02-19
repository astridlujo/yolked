import EdamamKeys from '../../constants/EdamamKeys';

const rootURL = 'https://api.edamam.com/api/food-database/';

async function getJson(url) {
  return fetch(url, {
    method: 'GET',
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Edamam JSON retrieval failed');
      console.log('Fetch failed!');
    }
  }).catch(err => {
    console.log(err);
  })
}

async function postJson(url, data) {
  return fetch(url, {
    method: 'POST',
    body: data
  })
}

export async function SearchFood(foodName) {
  let searchUrl = rootURL + 'parser?';
  let urlParams = `ingr=${encodeURI(foodName)}`
                + `&app_id=${EdamamKeys.foodAppId}&app_key=${EdamamKeys.foodAppKey}`;
  searchUrl = searchUrl.concat(urlParams);

  console.log(searchUrl);
  //console.log("Function working");
  console.log(foodName);

  const foodResponse = getJson(searchUrl);

  let response = 'default';

  await foodResponse.then(data => {
    //console.log(data);
    //console.log(data['hints']);
    console.log("LENGTH: " + data['hints'].length)
    response = data['hints'];
  })

  return response;
}
//
// export default class EdamamPull extends React.Component {
//   constructor(searchText = '') {
//     this.searchText = '';
//     this.result = '';
//
//     this.rootURL = 'https://api.edamam.com/api/food-database/';
//     //this.urlParams = URLSearchParams([['app_id',EdamamKeys.foodAppId],['app_key',EdamamKeys.foodAppKey]])
//     //this.urlParams = URLSearchParams(`app_id=${EdamamKeys.foodAppId}&app_key=${EdamamKeys.foodAppKey}`)
//   }
//   searchFood(searchText) {
//     this.searchText = searchText;
//
//     this.urlParams = URLSearchParams();
//     this.uriParams.append('ingr', searchText);
//     urlSearch = this.urlParams.toString();
//     console.log(urlSearch);
//   }
//
//   async getJson(url) {
//     const response = await fetch(url, {
//       method: 'GET',
//     })
//   }
//
//   async postJson(url, data) {
//     const response = await fetch(url, {
//       method: 'POST',
//       body: data
//     })
//   }
// }
