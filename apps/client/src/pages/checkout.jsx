import React, { useState, useEffect } from "react";
import Checkout from "../components/organisms/checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NotFound from "./404";
import { useParams } from "react-router-dom";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutPage() {
  const [isPending, setIsPending] = useState(true);
  const { plan: plan_name } = useParams();
  const [plan, setPlan] = useState({});

  useEffect(() => {
    const getPlan = async () => {
      setIsPending(true);
      try {
        const plan = await axios.get(
          `${import.meta.env.VITE_API_URL}/plan/${plan_name}`,
        );
        setPlan(plan.data.data);
        setIsPending(false);
      } catch (error) {}
    };
    getPlan();
  }, []);

  return !isPending ? (
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
          <Checkout name={plan.name} price={plan.price} />
        </div>
      </Elements>
    </>
  ) : (
    <NotFound />
  );
}

export default CheckoutPage;
