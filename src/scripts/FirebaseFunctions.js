import Firebase, { database } from '../../constants/FirebaseKeys';

export async function QueryFirebaseSettings() {
  const user = Firebase.auth().currentUser;
  if (user) {
    return database.collection('users').doc(user.uid).get()
    .then(function(doc) {
      const result = new Array();
      doc.data().settings.forEach(item => {
        result.push(item);
      });
      return result;
    });
  } else {
    alert('User not signed in');
  }
}

export async function GetSettings() {
  const fetchSettings = QueryFirebaseSettings();
  let response = new Array();

  await fetchSettings.then(data => {
    try {
      response = data;
    }
    catch(error) {
      console.log(error);
    }
  });
  return response;
}

// Overwrite existing array with user modified array
export async function UpdateSettings(newSettingArray) {
  const user = Firebase.auth().currentUser;
  if (user) {
    const toFirebase = new Array()
    newSettingArray.forEach(item => {
      toFirebase.push(item);
    });
    return database.collection('users').doc(user.uid).update({
      settings: toFirebase
    });
  } else {
    alert('User not signed in');
  }
}

export async function AddSetting(newSetting) {
  const currSettings = await GetSettings();
  // Check if item already exists
  if (currSettings.some(e => e === newSetting)) {
    // console.log(currSettings);
    // console.log('Already in settings!');
    // console.log(newSetting);
    return false;
  } else {
    try {
      currSettings.push(newSetting);
      UpdateSettings(currSettings);
    }
    catch(error) {
      console.log(error);
    }
  }
}

export async function RemoveSetting(setting) {
  const currSettings = await GetSettings();

  try {
    if(currSettings.some(e => e === setting)) {
      const newCurrSettings = currSettings.filter((item, index) => {
        if (item === setting) {
          return false;
        } else {
          return true;
        }
      });
      UpdateSettings(newCurrSettings);
    } else {
      throw `${setting} not present in pantry`;
    }
  }
  catch(error) {
    console.log(error);
  }
}

// You will need to use await on this in an async function
export async function QueryFirebaseFood() {
  const user = Firebase.auth().currentUser;
  if (user) {
    return database.collection('users').doc(user.uid).get()
    .then(function(doc) {
      const result = new Array();
      doc.data().favFoods.forEach(item => {
        result.push(JSON.parse(item));
      });
      return result;
    });
  } else {
    alert('User not signed in');
  }
}

export async function QueryFirebaseRecipes() {
  const user = Firebase.auth().currentUser;
  if (user) {
    return database.collection('users').doc(user.uid).get()
    .then(function(doc) {
      const result = new Array();
      doc.data().favRecipes.forEach(item => {
        result.push(JSON.parse(item));
      });
      return result;
    });
  } else {
    alert('User not signed in');
  }
}

// Return foods as a usable array
export async function GetFoods() {
  console.log("getting foods");
  const fetchFoods = QueryFirebaseFood();
  let response = new Array();

  await fetchFoods.then(data => {
    try {
      response = data;
    }
    catch(error) {
      console.log(error);
    }
  });
  return response;
}

// Overwrite existing array with user modified array
export async function UpdateFoods(newFoodArray) {
  const user = Firebase.auth().currentUser;
  if (user) {
    const toFirebase = new Array()
    newFoodArray.forEach(item => {
      toFirebase.push(JSON.stringify(item));
    });
    return database.collection('users').doc(user.uid).update({
      favFoods: toFirebase
    });
  } else {
    alert('User not signed in');
  }
}

// Grab array, append new item, and overwrite existing array
export async function AddFood(foodJSON) {
  const currFavs = await GetFoods();
  // Check if item already exists
  if (currFavs.some(e => e.foodData.food.foodId === foodJSON.foodData.food.foodId)) {
    console.log('Already in pantry!');
    let i = 0;
    const newCurrFavs = currFavs.filter((item, index) => {
      if (item.foodData.food.foodId === foodJSON.foodData.food.foodId) {
        i = index;
        return false;
      } else {
        return true;
      }
    });
    newCurrFavs.splice(i, 0, foodJSON);
    UpdateFoods(newCurrFavs);
  } else {
    try {
      if (foodJSON.quantity !== undefined && foodJSON.foodData !== undefined) {
        if (foodJSON.quantity > 0) {
          currFavs.push(foodJSON);
          UpdateFoods(currFavs);
        } else {
          throw 'Cannot place 0 items!';
        }
      } else {
        throw `Push for Adding Foods failed! Improper formatting`;
      }
    }
    catch(error) {
      console.log(error);
    }
  }
}

// Total removal of a food item...
export async function RemoveFood(id) {
  const currFavs = await GetFoods();

  try {
    if(currFavs.some(e => e.foodData.food.foodId === id)) {
      let i = 0;
      const newCurrFavs = currFavs.filter((item, index) => {
        if (item.foodData.food.foodId === id) {
          i = index;
          return false;
        } else {
          return true;
        }
      });
      UpdateFoods(newCurrFavs);
    } else {
      throw `${id} not present in pantry`;
    }
  }
  catch(error) {
    console.log(error);
  }
}

export async function GetRecipes() {
  const fetchRecipes = QueryFirebaseRecipes();
  let response = new Array();

  await fetchRecipes.then(data => {
    try {
      response = data;
    }
    catch(error) {
      console.log(error);
    }
  });
  return response;
}

export async function UpdateRecipes(newRecipeArray) {
  const user = Firebase.auth().currentUser;
  if (user) {
    const toFirebase = new Array()
    newRecipeArray.forEach(item => {
      toFirebase.push(JSON.stringify(item));
    });
    return database.collection('users').doc(user.uid).update({
      favRecipes: toFirebase
    });
  } else {
    alert('User not signed in');
  }
}

export async function AddRecipe(recipeJSON) {
  const currFavs = await GetRecipes();
  // Check if item already exists
  if (currFavs.some(e => e.recipe.url === recipeJSON.recipe.url)) {
    console.log('Already in favorites!');
    return false;
  } else {
    try {
      currFavs.push(recipeJSON);
      UpdateRecipes(currFavs);
    }
    catch(error) {
      console.log(error);
    }
  }
}

export async function RemoveRecipe(recipeURL) {
  const currFavs = await GetRecipes();

  try {
    if(currFavs.some(e => e.recipe.url === recipeURL)) {
      let i = 0;
      const newCurrFavs = currFavs.filter((item, index) => {
        if (item.recipe.url === recipeURL) {
          i = index;
          return false;
        } else {
          return true;
        }
      });
      UpdateRecipes(newCurrFavs);
    } else {
      throw `${recipeURL} not present in pantry`;
    }
  }
  catch(error) {
    console.log(error);
  }
}
