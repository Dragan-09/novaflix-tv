import React from "react";
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

async function createOrder(name) {
  console.log(name);
  const order = await axios.post(
    `${import.meta.env.VITE_API_URL}/plans/create-paypal-order`,
    { plan: name },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return order.data.data.id;
}

async function onApprove(data) {
  // replace this url with your server
  const response = await fetch(
    "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    },
  );
  const orderData = await response.json();
}

function PaypalWrapper({ plan_name }) {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <PayPalButtons
      disabled={false}
      // onApprove={() => onApprove()}
      createOrder={() => createOrder(plan_name)}
      // displayOnly={["vaultable"]}
      style={{
        label: "paypal",
        color: "blue",
        shape: "rect",
        layout: "horizontal",
        height: 40,
        tagline: false,
        disableMaxWidth: true,
      }}
      className="w-full"
    />
  );
}

export default PaypalWrapper;
