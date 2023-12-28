import React, { useState } from "react";
import Icon from "../atoms/icon";
import Button from "../atoms/button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import parse from "html-react-parser";
import Li from "../atoms/li";

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
        },
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
      className={`plan shadow-black rounded-3xl overflow-hidden px-0 sm:px-0 pb-10 w-[90%] sm:w-full text-center text-gray mx-auto ${
        // main ? "bg-primary dark:bg-white" : "bg-white dark:bg-slate-800"
        "bg-white dark:bg-slate-800"
      }`}>
      <div
        className={`icon py-12 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:translate-y-[100%] after:border-[20px] after:border-transparent ${
          // main
          //   ? "dark:bg-slate-800 dark:after:border-t-slate-800 bg-white after:border-t-white drop-shadow-2xl"
          //   : "bg-primary dark:bg-white after:border-t-primary dark:after:border-t-white"
          "bg-primary dark:bg-slate-200 after:border-t-primary dark:after:border-t-slate-200"
        }`}>
        <Icon
          icon={icon}
          width="150px"
          height="150px"
          className="mx-auto invert dark:invert-0"
        />
      </div>
      <div
        className={`title capitalize text-4xl font-semibold pt-7 ${
          // main ? "text-white dark:text-primary" : "text-primary dark:text-white"
          "text-primary dark:text-white"
        }`}>
        {title}
      </div>
      <div
        className={`description px-10 sm:px-5 xl:px-10 pt-7 text-left ${
          // main ? "text-gray-100 dark:text-gray-300" : "text-gray-300"
          "text-gray-300"
        }`}>
        <ul className="list-disc list-inside hyphens-auto leading-7">
          {description.split(", ").map(item => {
            return <Li icon={"check"}>{item}</Li>;
          })}
        </ul>
      </div>
      <hr className="my-10 mx-10" />
      <div
        className={`price text-5xl font-light ${
          // main ? "text-white dark:text-primary" : "text-primary dark:text-white"
          "text-primary dark:text-white"
        }`}>
        &#x24;{price}
      </div>
      <div
        className={`resubscription text-sm pb-10 ${
          // main ? "text-gray-100 dark:text-gray-300" : "text-gray-300"
          "text-gray-300"
        }`}>
        {resubdesc}
      </div>
      <Button
        size="large"
        style="rounded"
        color="text-white"
        className={`${
          main ? "shadow shadow-xl dark:shadow-lg shadow-secondary/70" : ""
        }`}
        onClick={purchase}>
        {isProcessing ? "Processing..." : "Start Now"}
      </Button>
    </div>
  );
}

export default PlanCard;
