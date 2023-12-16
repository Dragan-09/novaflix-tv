import React, { useState } from "react";
import Icon from "../atoms/icon";
import Button from "../atoms/button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function PlanCard({ id, title, description, price, resubdesc, icon, main }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const purchase = async () => {
    try {
      setIsProcessing(true);
      const plan = await axios.post(
        `${import.meta.env.VITE_API_URL}/plan/${id}`,
        {},
        {
          headers: { Authorization: localStorage.getItem("Authorization") },
        }
      );
      window.location.href = plan.data.checkout_url;
    } catch (error) {
      if (error.response.status === 403) {
        window.location.href = "/auth/login";
      }
      if (error.response.status === 400) {
        toast.error(error.response.data.message, { position: "top-center" });
      }
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div
      className={`plan shadow shadow-xl rounded-3xl py-10 px-0 sm:px-10 sm:py-10 w-[80%] sm:w-full text-center text-gray mx-auto ${
        main ? "bg-primary dark:bg-white" : "bg-white dark:bg-slate-800"
      }`}
    >
      <div className="icon">
        <Icon
          icon={icon}
          width="100px"
          height="100px"
          className="mx-auto dark:grayscale"
        />
      </div>
      <div
        className={`title capitalize text-4xl font-semibold pt-7 ${
          main ? "text-white dark:text-primary" : "text-primary dark:text-white"
        }`}
      >
        {title}
      </div>
      <div
        className={`description px-10 pt-7 ${
          main ? "text-gray-100 dark:text-gray-300" : "text-gray-300"
        }`}
      >
        {description}
      </div>
      <hr className="my-10 mx-10" />
      <div
        className={`price text-5xl font-light ${
          main ? "text-white dark:text-primary" : "text-primary dark:text-white"
        }`}
      >
        &#x24;{price}
      </div>
      <div
        className={`resubscription text-sm pb-10 ${
          main ? "text-gray-100 dark:text-gray-300" : "text-gray-300"
        }`}
      >
        {resubdesc}
      </div>
      <Button
        size="large"
        style="rounded"
        color="text-white"
        className={`${main ? "shadow shadow-xl shadow-secondary/70" : ""}`}
        onClick={purchase}
      >
        {isProcessing ? "Processing..." : "Start Now"}
      </Button>
    </div>
  );
}

export default PlanCard;