import { GetRecipes, UpdateRecipes, RemoveRecipe } from '../scripts/FirebaseFunctions';

export const initialState = {
    update: 2,
    tempKey: 0,
    visible: false,
    recipeItems : []
};


export function reducer (state, action) {
  const idx = state.recipeItems.findIndex(item => item.recipe.url === action.key);

  switch (action.type) {
    case 'popup':
       {
         state.tempKey = action.key;
         return {...state,visible: true};
       }
    case 'delete':
       {
         const idx2 = state.recipeItems.findIndex(item => item.recipe.url === state.tempKey);
         const item = Object.assign([], state);
         item.recipeItems.splice(idx2, 1);
         UpdateRecipes(state.recipeItems);

         return {...state,visible: false};
       }
     case 'closepopup':
        {
          return {...state,visible: false};
        }
   case 'setArray':
     {
         return{...state, recipeItems: action.newArray, update: state.update+1 }
     }
    default:
      return state;
  }
}
