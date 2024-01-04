import React, { useState } from "react";
import Icon from "../atoms/icon";
import Button from "../atoms/button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import parse from "html-react-parser";
import Li from "../atoms/li";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function PlanCard({
  id,
  title,
  description,
  features,
  price,
  resubdesc,
  icon,
  main,
}) {
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
      location.href = `/checkout/plan-${title.toLowerCase()}`;
      // location.href = plan.data.checkout_url;
    } catch (error) {
      if (error.response.status === 303) {
        location.href = "/auth/login";
      }
      if (error.response.status === 300) {
        toast.error(error.response.data.message, { position: "top-center" });
      }
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={classNames(
        id === 3
          ? "bg-[#1b2335] ring-2 ring-primary"
          : "ring-1 ring-white/10 bg-slate-900",
        "rounded-3xl p-8 xl:p-10",
      )}>
      <div className="flex items-center justify-between gap-x-4">
        <h3
          id={title}
          className={classNames(
            id === 4 ? "uppercase" : "capitalize",
            "text-lg font-semibold leading-8 text-white",
          )}>
          {title}
        </h3>
        {id === 3 ? (
          <p className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold leading-5 text-white">
            Most popular
          </p>
        ) : null}
      </div>
      <p className="mt-4 text-sm leading-6 text-gray-300">{description}</p>
      <p className="mt-6 flex items-baseline gap-x-1">
        <span className="text-4xl font-bold tracking-tight text-white">
          ${price}
        </span>
        <span className="text-sm font-semibold leading-6 text-gray-300">
          /{resubdesc}
        </span>
      </p>
      <a
        // aria-describedby={tier.id}
        onClick={purchase}
        className={classNames(
          id === 3
            ? "bg-primary/70 text-white shadow-sm hover:bg-primary focus-visible:outline-primary"
            : "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white",
          "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer",
        )}>
        Buy plan
      </a>
      <ul
        role="list"
        className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10">
        {features.split(", ").map(feature => (
          <li key={feature} className="flex gap-x-3">
            <CheckIcon
              className="h-6 w-5 flex-none text-white"
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlanCard;
