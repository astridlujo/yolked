  export const initialState = {
    update: 2, 
    visible: false,
  foodItem : [
    {
      key: '0',
      item: 'First Item',
      amount: 5,
    },
    {
      key: '1',
      item: 'Second Item',
      amount: 6,
    },
    {
      key: '2',
      item: 'Third Item',
      amount: 7,
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
          //console.log(state);
          return {...state,visible: true};
        }
        case 'closepopup':
         {
          //console.log(state.update);
          const newKey = state.update + 1;

          state.foodItem.push({key: newKey, item: action.newItem, amount: action.newAmount})
          return {...state,visible: false, update: state.update + 1};
        }
      default:
        return state;
    }
  }