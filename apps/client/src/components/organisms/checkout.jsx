import React, { useEffect } from "react";
import Form from "../atoms/form";
import {
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import Button from "../atoms/button";
import { useState } from "react";
import axios from "axios";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

// const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  // const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    const getPaymentIntent = async () => {
      const paymentIntent = await axios.post(
        `${import.meta.env.VITE_API_URL}/stripe/create-payment-intent`,
        {},
      );
      setClientSecret(paymentIntent.data.clientSecret);
      console.log(paymentIntent.data.clientSecret);
    };
    getPaymentIntent();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      const submit = await elements.submit();
      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${import.meta.env.VITE_BASE_URL}?congrats=subscription`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function createOrder() {
    // replace this url with your server
    const response = await fetch(
      "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
          cart: [
            {
              sku: "1blwyeo8",
              quantity: 2,
            },
          ],
        }),
      },
    );
    const order = await response.json();
    return order.id;
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

  return (
    <Form onSubmit={handleSubmit}>
      <PayPalScriptProvider
        deferLoading
        options={{
          clientId:
            "AS7q2S-BtS3Fb1SFyEbySfa1GrM4x8q1Ft1olRkb6yyW0bxHF9ULpAEf-B23n4FBpxQ-XwCQvW9Sz_04",
          components: "buttons",
          currency: "USD",
        }}>
        {() => {
          const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
          console.log("dada");
          return (
            <div className="w-full">
              <PayPalButtons
                disabled={false}
                onApprove={onApprove}
                createOrder={createOrder}
                // displayOnly={["vaultable"]}
                style={{
                  label: "paypal",
                  color: "silver",
                  shape: "rect",
                  layout: "horizontal",
                }}
              />
            </div>
          );
        }}
      </PayPalScriptProvider>
      <LinkAuthenticationElement className="col-span-2" />
      <PaymentElement className="col-span-2" />
      <Button
        size={"medium"}
        color={"primary"}
        style={"filled"}
        className={"col-span-2"}>
        Purchase
      </Button>
    </Form>
  );
}

export default Checkout;
