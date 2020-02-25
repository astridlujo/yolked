import Firebase, { database } from '../../constants/FirebaseKeys.js';

export default class UserFavorites {
  constructor() {
    this.FavoriteFoods = this.getFoods();
    //this.FavoriteRecipes = RetrieveUserRecipes();
  }

  async getFoods() {
    this.FavoriteFoods = await RetrieveUserFoods();

    return this.FavoriteFoods();
  }

  async getRecipes() {
    // this.FavoriteRecipes = await RetrieveUserRecipes();
    //
    // return this.FavoriteRecipes();
  }
}

export function RetrieveUserFoods() {
  Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      database.collection('users').doc(user.uid).get().then(doc =>{
        const favFoods = [];
        doc.data().favFoods.forEach(item => {
          favFoods.push(JSON.parse(item));
        });

        return favFoods;
      });
      console.log(user);
    } else {
      console.log('A user is not signed in.');
    }
  })
}

export function RetrieveUserRecipes() {

}

export function UpdateUserFoods() {

}

export function UpdateUserRecipes() {

}
