import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MailId = () => {
  const [apiError, setApiError] = useState(null);
  const { query } = useRouter();

  const { uuid } = query;
  // console.log("uuid", uuid);

  const verifyEmail = async () => {
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/users/verification//email/signup/${uuid}`
      );
    } catch (err) {
      setApiError(err.response.data.message);
    }
  };

  useEffect(() => {
    if (uuid !== undefined) {
      verifyEmail();
    }
  }, [uuid]);

  return (
    <div className="container flex flex-col m-12 m-auto mt-40 text-center">
      {!apiError ? (
        <>
          <div className="mb-8 text-sky-500">
            <h1 className="mb-4 text-5xl font-medium leading-tight">
              Your Email has been verified successfully.
            </h1>
          </div>
          <div className="mb-12 text-zinc-400">
            <p className="mb-6">
              Your account will be activated within next 24 hours.
            </p>
          </div>
        </>
      ) : (
        <h1 className="mb-4 text-5xl font-medium leading-tight">{apiError}</h1>
      )}
    </div>
  );
};

export default MailId;
