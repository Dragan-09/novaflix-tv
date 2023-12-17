import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Message from "../components/organisms/message";

function EmailConfirmPage() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(
    "The email confirmation link seems to be incomplete or invalid!"
  );
  const { encrypted_string: token } = useParams();
  useEffect(() => {
    const confirmUserEmail = async () => {
      if (token) {
        try {
          const confirm = await axios.post(
            `${
              import.meta.env.VITE_API_URL
            }/user/account/email-confirmation/${token}`,
            {}
          );
          setMessage(confirm.data.message);
          console.log(confirm);
        } catch (error) {
          setMessage(error.response.data.message);
        } finally {
          setLoading(false);
        }
      }
    };
    confirmUserEmail();
  }, []);

  return (
    !loading && (
      <Message message={message} buttons={[{ content: "Home", link: "/" }]} />
    )
  );
}

export default EmailConfirmPage;
