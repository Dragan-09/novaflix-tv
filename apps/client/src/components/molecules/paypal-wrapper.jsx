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
  const orderData = await axios.post(
    `${import.meta.env.VITE_API_URL}/plans/capture-paypal-order`,
    { orderID: data.orderID },
    { headers: { "Content-Type": "application/json" } },
  );
}

function PaypalWrapper({ plan_name }) {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <PayPalButtons
      disabled={false}
      onApprove={onApprove}
      createOrder={(data, action) => createOrder(plan_name)}
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
