const RegistrationStatus = () => {
  return (
    <div className="container flex flex-col m-12 m-auto mt-40 text-center">
      <div className="mb-8 text-sky-500">
        <h1 className="mb-4 text-5xl font-medium leading-tight">
          Signup Successfull
        </h1>
        {/* <p className="text-xl">Check Your Email</p> */}
      </div>

      <div className="mb-12 text-zinc-400">
        <p className="mb-6">
          Please check your mail for a link to verify your email address.
        </p>
        <p>Once verified, You will be able to continue.</p>
      </div>
      <div className="flex justify-center mb-4">
        <svg
          style={{ width: "15%" }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-24 h-24 text-sky-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      </div>
      <p className="text-zinc-400">
        Did not recieve an email?{" "}
        <a className="text-blue-500 underline" href="#">
          Resend
        </a>
      </p>
    </div>
  );
};

export default RegistrationStatus;
