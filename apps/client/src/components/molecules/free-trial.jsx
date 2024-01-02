import React from "react";
import Popup from "reactjs-popup";
import Button from "../atoms/button";
import axios from "axios";
import toast from "react-hot-toast";
import refreshAccountUtil from "../utils/refresh-account";
import { useDispatch } from "react-redux";
import Icon from "../atoms/icon";

function FreeTrial() {
  const dispatch = useDispatch();
  const try24h = async () => {
    const trial = axios.post(
      `${import.meta.env.VITE_API_URL}/trial`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      },
    );

    new URLSearchParams().set("congrats", "trial");

    toast.promise(trial, {
      loading: "Processing",
      success: data => {
        refreshAccountUtil(dispatch);
        return data.data.message;
      },
      error: error => {
        if (error.response?.status === 400) {
          return error.response?.data?.message;
        }
        if (error.response?.status === 403) {
          window.location.href = "/auth/login";
          return "Please Sign in / Register!";
        }
      },
    });
  };

  return (
    <Popup
      modal
      nested
      position="center center"
      trigger={
        <Button style="filled" size="large" color="primary" className="shadow">
          Get Free Trial
        </Button>
      }>
      {close => (
        <div className="modal w-11/12 sm:w-1/2 bg-white p-8 rounded-lg text-center mx-auto shadow-xl border-primary dark:bg-slate-800">
          <div className="header text-2xl font-bold mb-2 text-primary dark:text-white">
            Free Trial
          </div>
          <div className="content text-gray-600 text-sm dark:text-gray-400">
            Welcome to Televista's Free Trial! Immerse yourself in our world of
            entertainment with unlimited access to premium content for 24 hours.
            Explore diverse shows, movies, and more hassle-free. No commitments,
            cancel anytime. Begin your adventure now!
          </div>
          <div className="actions mt-5 flex gap-2 justify-center">
            <Button
              style="filled"
              size="medium"
              color="primary"
              onClick={() => {
                try24h();
                close();
              }}>
              Start Trial <Icon width={12} icon={"right"} className={"ms-1"} />
            </Button>
            <Button
              style="outline"
              size="medium"
              color="secondary"
              onClick={close}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default FreeTrial;
