// Remove duplicate items returned by Edamam to have unique keys.
export function removeDuplicates(_array, _type) {
  switch(_type) {
    case 'food':
      return _array.filter((item, index, self) => {
        return index === self.findIndex((subItem) => {
          if (subItem.food.foodId !== null) {
            return subItem.food.foodId === item.food.foodId;
          }
        })
      });
      break;
  }
}

export async function getJson(url) {
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

export async function postJson(url, data) {
  return fetch(url, {
    method: 'POST',
    body: data
  })
}
