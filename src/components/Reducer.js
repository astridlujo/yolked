  export const initialState = {
    update: 2, 
    newKey: 2,
    tempKey: 0,
    visible: false,
  foodItem : [
    {
      key: '0',
      item: 'First Item',
      amount: 5,
      image: '',
    },
    {
      key: '1',
      item: 'Second Item',
      amount: 6,
      image: '',
    },
    {
      //key: '2',
      quanity: 7,
      food:{
        foodId: "",
        lable: "Third Item" ,
        image:'',
      },

    },
  
    ]};
  

  export const reducer = (state, action) => {
    const idx = state.foodItem.findIndex(item => item.key === action.key);
   
    switch (action.type) {
      case 'onIncrease':
          {
            state.foodItem[idx].amount += 1;
          return {...state,update: state.update +1};
          }
      case 'onDecrease':
          {
            state.foodItem[idx].amount -= 1;
        return{...state,update: state.update +1}
          }
      case 'onDelete':
         {
          const item = Object.assign([], state);
          item.foodItem.splice(idx, 1);
          
          return item;
        }
        case 'popup':
         {
          state.tempKey = action.key;
          return {...state,visible: true};
        }
        case 'closepopup':
         {
          const idx2 = state.foodItem.findIndex(item => item.key === state.tempKey);
          const item = Object.assign([], state);
          item.foodItem.splice(idx2, 1);
          state.newKey + 1;
          //console.log(state);
          //state.foodItem.push({key: state.newKey, item: action.newItem, amount: action.newAmount})
          return {...state,visible: false};
        }
      default:
        return state;
    }
  }