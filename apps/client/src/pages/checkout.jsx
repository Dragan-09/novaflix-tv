import React from "react";
import Checkout from "../components/organisms/checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutPage() {
  return (
    <>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "subscription",
          amount: 1500,
          currency: "usd",
          payment_method_types: ["card"],
          appearance: {
            theme: "night",
            variables: {
              colorBackground: "#1e293b",
              colorPrimary: "#9980FA",
              fontSizeBase: "15px",
              spacingUnit: "4px",
            },
          },
        }}>
        <div className="container mx-auto w-full h-screen flex items-center justify-center">
          <Checkout />
        </div>
      </Elements>
    </>
  );
}

export default CheckoutPage;
