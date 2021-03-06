import EdamamKeys from '../../constants/EdamamKeys';
import { GetSettings } from './FirebaseFunctions';
const foodRoot = 'https://api.edamam.com/api/food-database/';
const recipeRoot = 'https://api.edamam.com/search';
// Global variable for user preferences stored in settings using async storage...

function getJson(url) {
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

function postJson(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Edamam JSON nutrient retrieval failed');
      console.log('Fetch failed!');
    }
  }).catch(err => {
    console.log(err);
  })
}

export async function GetNutrients(data) {
  let searchURL = `https://api.edamam.com/api/food-database/nutrients?&app_id=${EdamamKeys.foodAppId}&app_key=${EdamamKeys.foodAppKey}`;
  const nutrientResponse = postJson(searchURL, data);

  let daily = {};
  let total = {};
  let response = new Array();

  await nutrientResponse.then(data => {
    // console.log(data.totalDaily);
    daily = data.totalDaily;
    response.push(daily)
    total = data.totalNutrients;
    response.push(total)

  });

  return response;
}
export async function SearchFood(foodName) {
  let searchUrl = foodRoot + 'parser?';
  let urlParams = `ingr=${encodeURI(foodName)}`
                + `&app_id=${EdamamKeys.foodAppId}&app_key=${EdamamKeys.foodAppKey}`;
  let healthLabels = '';
  const currSettings = await GetSettings();

  currSettings.forEach((element, index) => {
    healthLabels = healthLabels.concat(`&health=${element}`);
  })

  searchUrl = searchUrl.concat(urlParams);
  searchUrl = searchUrl.concat(healthLabels);

  console.log(foodName);
  console.log(searchUrl);

  const foodResponse = getJson(searchUrl);
  let response = new Array();

  await foodResponse.then(data => {
    console.log("LENGTH: " + data.hints.length)
    if (data.hints !== undefined) {
      response.push({hints: data.hints});
    } else {
      response.push({hints: undefined});
    }
    //toAppend.push({hints: data.hints});
    if (data._links !== undefined) {
      response.push({nHref: data._links.next.href});
    } else {
      response.push({nHref: undefined});
    }
    response.push({pHref: searchUrl})
  })

  return response;
}

export async function GetMore(href) {
  const response = getJson(href);
  let toAppend = new Array();

  await response.then(data => {
    if (data.hints !== undefined) {
      toAppend.push({hints: data.hints});
    } else {
      toAppend.push({hints: undefined});
    }
    //toAppend.push({hints: data.hints});
    if (data._links !== undefined) {
      toAppend.push({nHref: data._links.next.href});
    } else {
      toAppend.push({nHref: undefined});
    }
    //toAppend.push({href: data._links.next.href});
  });

  console.log(response);
  return toAppend;
}

export async function SearchRecipe(recipeName, from, to) {
  if(from >= 100) {
    console.log('Cannot paginate past 100 results due to API');
    return;
  }

  let searchUrl = recipeRoot;
  let urlParams = `?q=${encodeURI(recipeName)}`
                + `&from=${from}&to=${to}`
                + `&app_id=${EdamamKeys.recipeAppId}&app_key=${EdamamKeys.recipeAppKey}`;

  let healthLabels = '';
  const currSettings = await GetSettings();

  currSettings.forEach((element, index) => {
    if (element === 'high-protein' || element === 'low-carb') {
      healthLabels = healthLabels.concat(`&diet=${element}`);
    } else {
      healthLabels = healthLabels.concat(`&health=${element}`);
    }
  })

  searchUrl = searchUrl.concat(urlParams);
  searchUrl = searchUrl.concat(healthLabels);

  console.log(searchUrl);
  const recipeResponse = getJson(searchUrl);

  let response = [];

  await recipeResponse.then(data => {
    //console.log(data);
    //console.log(data['hints']);
    console.log("LENGTH: " + data['hits'].length)
    response.push({hits:data['hits']});
    response.push({from: from, to: to});
    // console.log(response);
  });

  return response;
}
