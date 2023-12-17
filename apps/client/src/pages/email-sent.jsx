import React from "react";
import Message from "../components/organisms/message";

function EmailSent() {
  return (
    <Message
      message={
        "Welcome! Your account has been successfully created. We sent a verfification link, check you email!"
      }
      buttons={[
        { content: "Signin", link: "/auth/login" },
        { content: "Home", link: "/", color: "white" },
      ]}
    />
  );
}

export default EmailSent;
