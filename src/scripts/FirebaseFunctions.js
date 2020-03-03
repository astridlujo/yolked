import Firebase, { database } from '../../constants/FirebaseKeys';

export async function QueryFirebase() {
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

// Return foods as a usable array
export async function GetFoods() {
  const fetchFoods = QueryFirebase();
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
    })
  } else {
    alert('User not signed in')
  }
}

// Grab array, append new item, and overwrite existing array
export async function AddFood(foodJSON) {
  const currFavs = await GetFoods();
  try {
    if (foodJSON.quantity !== undefined && foodJSON.food !== undefined) {
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

export function RemoveFood(foodJSON) {

}

export function GetRecipes() {

}

export function AddRecipe(recipeJSON) {

}

export function UpdateRecipes(newRecipeArray) {

}

export function RemoveRecipe(recipeJSON) {

}
