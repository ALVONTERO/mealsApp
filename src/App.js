import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)
  const showCartHandler = () => { 
    setCartIsShown(true)
   }
   const hidCartHandler = () => { 
    setCartIsShown(false)
   }

  return (
    <>
      {cartIsShown && <Cart onClose={hidCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
