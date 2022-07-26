import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { uiActions } from "./store/uiSlice";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true;
const url = "https://my-react-bbfab-default-rtdb.firebaseio.com/cart.json";
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending",
          message: "Sending cart data!",
        })
      );
      const response = await fetch(url, {
        method: "PUT", //put for update previous value
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("sending cart data failed");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Send cart data successfully!",
        })
      );

      // const responseData = await response.json();
    };

    ////this will return if state is initial
    if (isInitial) {
      isInitial = false;
      return;
    }
    console.log(isInitial);

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);
  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
