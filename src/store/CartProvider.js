import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //Update Total Amount First (Simple Logic)
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    //Check if item exist in the cart or not by using (( findIndex() Method ))
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    //Get existing item after knowing its index
    const existingCartItem = state.items[existingCartItemIndex];
    //Creat a variable of updated items array which will be added to cart
    let updatedItems;
    //Check if existingCartItem returning any item or not
    if (existingCartItem) {
      //Create a const to iterate same item in the cart with the change of the amount to it
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      //add the stete items to the variable i have just created outside the condition
      updatedItems = [...state.items];
      //Apply change to the existing item in the cart
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //Add item with CONCAT Method because it recreates new array with the added value
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    //Check if item exist in the cart or not by using (( findIndex() Method ))
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    //Get existing item after knowing its index
    const existingItem = state.items[existingCartItemIndex];
    //Update Total Amount First (Simple Logic)
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return {
      defaultCartState,
    };
  }
  return defaultCartState;
};

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
