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
    <Button
      style="filled"
      size="large"
      color="primary"
      className="shadow"
      onClick={() => {
        try24h();
      }}>
      Get Free Trial
    </Button>
  );
}

export default FreeTrial;
