import { Puff } from "react-loader-spinner";

export const Loading = () => {
  return (
    <div
      className="loader position-fixed h-100 w-100 d-flex justify-content-center align-items-center"
      style={{
        zIndex: "111111",
        background: "#00000069",
      }}
    >
      <SpinnerLoader />
    </div>
  );
};

export const SpinnerLoader = () => {
  return (
    <Puff
      height="100"
      width="100"
      color="#2f65b9"
      radius="6"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="rings-loading"
    />
  );
};
