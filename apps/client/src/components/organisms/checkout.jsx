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
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalWrapper from "../molecules/paypal-wrapper";
import Icon from "../atoms/icon";
import { useParams } from "react-router-dom";

// const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function Checkout({ name, price }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [showCardPayment, setShowCardPayment] = useState(false);

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

  const toggleCardPayment = e => {
    e.preventDefault();
    setShowCardPayment(!showCardPayment);
  };

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

  return (
    <Form
      onSubmit={handleSubmit}
      className={"flex items-center justify-center sm:block text-center"}>
      <div className="product col-span-2 text-center">
        <div className="name font-semibold text-2xl text-gray-400">
          {name} <span className="font-normal">Plan</span>
        </div>
        <div className="price text-2xl font-light">${price}</div>
      </div>
      <LinkAuthenticationElement className="col-span-2" />
      <div className="methods col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          className="w-full h-[40px] bg-primary text-white rounded-[3px] flex items-center justify-center cursor-pointer order-last sm:order-first"
          onClick={toggleCardPayment}>
          <Icon icon={"cart"} width={27} />
        </button>
        <div>
          <PayPalScriptProvider
            options={{
              clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
              components: "buttons",
              currency: "USD",
            }}>
            <PaypalWrapper plan_name={name} />
          </PayPalScriptProvider>
        </div>
      </div>
      {showCardPayment && (
        <div className="card-payment col-span-2 grid grid-cols-2">
          <PaymentElement className="col-span-2" />
          <Button
            size={"medium"}
            color={"primary"}
            style={"filled"}
            className={"col-span-2 mt-2"}>
            Purchase
          </Button>
        </div>
      )}
    </Form>
  );
}

export default Checkout;
