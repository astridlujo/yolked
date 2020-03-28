import { GetFoods, UpdateFoods, RemoveFood } from '../scripts/FirebaseFunctions';

export const initialState = {
    update: 2,
    tempKey: 0,
    visible: false,
    foodItems : []
};


export function reducer (state, action) {
  const idx = state.foodItems.findIndex(item => item.foodData.food.foodId === action.key);

  switch (action.type) {
    case 'onIncrease':
        {
          state.foodItems[idx].quantity += 1;
          UpdateFoods(state.foodItems);
          return {...state,update: state.update +1};
        }
    case 'onDecrease':
        {
          if (state.foodItems[idx].quantity - 1 > 0 ) {
            state.foodItems[idx].quantity -= 1;

            UpdateFoods(state.foodItems);
            return{...state,update: state.update +1}
          } else {
            return {...state, visible:true, tempKey: action.key};
          }
        }
    case 'popup':
       {
         state.tempKey = action.key;
         return {...state,visible: true};
       }
    case 'delete':
       {
         const idx2 = state.foodItems.findIndex(item => item.foodData.food.foodId === state.tempKey);
         const item = Object.assign([], state);
         item.foodItems.splice(idx2, 1);
         UpdateFoods(state.foodItems);

         return {...state,visible: false};
       }
     case 'closepopup':
        {
          return {...state,visible: false};
        }
   case 'setArray':
     {
         return{...state, foodItems: action.newArray, update: state.update+1 }
     }
    default:
      return state;
  }
}
