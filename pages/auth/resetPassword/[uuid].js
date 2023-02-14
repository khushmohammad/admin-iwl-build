import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import Auth from "../../../layouts/auth";

const schema = yup
  .object({
    password: yup.string().required("Password is required").min(8),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password doesn't match")
      .required("Confirm password is required"),
  })
  .required();

const ResetPassword = () => {
  const [apiError, setApiError] = useState(null);
  const [apiError2, setApiError2] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { query } = useRouter();
  const { uuid } = query;
  console.log("uuid", uuid);

  const router = useRouter();

  //form validate and config
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_PATH}/users/verification/email/resetPassword/${uuid}`
      )
      .then((res) => {
        console.log(res.data);
        unregister("confirmPassword");
        axios
          .patch(
            `${process.env.NEXT_PUBLIC_API_PATH}/users/userInfo/resetPassword/${uuid}`,
            data
          )
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              router.push("/auth/login");
            }
          })
          .catch((err) => {
            console.log(err);
            let error = err.response.data.message;
            setApiError2((prevState) => error);
          });
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data.message;
        setApiError((prevState) => error);
      });
  };

  return (
    <Auth>
      {/* <div className="container flex flex-col m-12 m-auto mt-40 justify-content-center">
        <div className="col-md-12 bg-white pt-5 pt-5 pb-lg-0 pb-5"> */}
      <div className="sign-in-from">
        <h2 className="mb-0">Reset Your Password</h2>
        {apiError && (
          <div className="p-2 my-2 text-center text-danger bg-dark">
            {apiError}
          </div>
        )}
        {apiError2 && (
          <div className="p-2 my-2 text-center text-danger bg-dark">
            {apiError2}
          </div>
        )}

        <form className="mt-4 " onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="position-relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="form-control mb-0 pwd-form-control"
                id="password"
                placeholder="Enter Password"
                autoComplete="true"
              />
              <span
                onClick={() => setShowPassword((prevState) => !prevState)}
                className="icon cursor-pointer material-symbols-outlined material-icons-outlined position-absolute top-50 pwd-icon translate-middle-y"
              >
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            </div>
            {errors.password && (
              <p className="my-2 text-danger">{errors.password.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="cfrmPassword">
              Confirm password
            </label>
            <div className="position-relative">
              <input
                {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                className="form-control mb-0"
                id="cfrmPassword"
                placeholder="Enter Confirm password"
                autoComplete="true"
              />
              <span
                onClick={() =>
                  setShowConfirmPassword((prevState) => !prevState)
                }
                className="icon cursor-pointer material-symbols-outlined material-icons-outlined position-absolute top-50 pwd-icon translate-middle-y"
              >
                {showConfirmPassword ? "visibility" : "visibility_off"}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="my-2 text-danger">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="d-inline-block w-100">
            <button type="submit" className="btn btn-primary float-right">
              Reset Password
            </button>
          </div>
        </form>
      </div>
      {/* </div>
      </div> */}
    </Auth>
  );
};

export default ResetPassword;
