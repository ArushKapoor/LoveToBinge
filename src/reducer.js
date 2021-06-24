// This is the initial state of the data layer
export const initialState = {
  posts: [],
};

// This is where we create the reducer which has state and actions which
// are called to check the current value of the data layer and to make
// changes to the data layer/ global variable
const reducer = (state, action) => {
  //   console.log(action);

  // this is a switch case to decide what changes to make in the data
  // layer when we fire off a dispatch
  switch (action.type) {
    case "CREATE_POSTS":
      return {
        ...state,
        posts: action.item?.posts,
      };
    // This case sets the value of the user
    case "SET_USER":
      return {
        ...state,

        // We set the user in the data layer to the user passed to us
        user: action.user,
      };

    // This case is to add an item to the basket
    case "ADD_TO_BASKET":
      // Logic for adding item to basket
      return {
        ...state,

        // we put everthing which the basket state already had and then
        // added action.item which adds the next item
        basket: [...state.basket, action.item],
      };

    // This case is to remove an item from the basket
    case "REMOVE_FROM_BASKET":
      // Logic for removing item from basket

      // we cloned the basket
      let newBasket = [...state.basket];

      // We look for the index of the id in the basket, if it is found it
      // will return the index or else it will return -1
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      // If index is found we remove the item from the basket using splice
      // If an error occurs we display it in the console
      if (index >= 0) {
        // item exists in basket, remove it...
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in the basket`
        );
      }
      return { ...state, basket: newBasket };

    default:
      return state;
  }
};

// Anything that we have to use outside of this file, we export it
export default reducer;
