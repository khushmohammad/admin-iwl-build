import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Auth from "../../../layouts/auth";

const schema = yup
  .object({
    userName: yup.string().email().required("Username is required"),
  })
  .required();

const ForgotPassword = () => {
  const [ApiError, setApiError] = useState();
  const router = useRouter();

  //form validate and config
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_PATH}/users/userInfo/${data.userName}`
      )
      .then((res) => {
        if (res.status === 200) {
          axios
            .get(
              `${process.env.NEXT_PUBLIC_API_PATH}/users/userInfo/resetPassword/linkGenerate/${data.userName}`
            )
            .then((res) => {
              router.push("/auth/forgot-password/reset");
            })
            .catch((err) => {
              setApiError(err.response.data.message);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setApiError(err.response.data.message);
      });
  };

  return (
    <>
      <Auth>
        <div className=" bg-white pt-5 pt-5 pb-lg-0 pb-5">
          <div className="sign-in-from">
            <h1 className="mb-0">Find Your Account</h1>
            <p>
              Please enter your email address or mobile number to search for
              your account.
            </p>
            {ApiError && ApiError ? (
              <div className="p-2 my-2 text-center text-danger bg-dark">
                {ApiError}
              </div>
            ) : null}
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="form-label" htmlFor="InputEmail">
                  UserName/Email
                </label>
                <input
                  {...register("userName")}
                  type="email"
                  className="form-control mb-0"
                  id="InputEmail"
                  placeholder="Enter email"
                />
                {errors.userName && (
                  <p className="my-2 text-danger">{errors.userName.message}</p>
                )}
              </div>
              <div className="d-inline-block w-100">
                <button type="submit" className="btn btn-primary float-right">
                  Search
                </button>
                <Link
                  href="/auth/login"
                  className="btn btn-secondary mx-2 float-right"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Auth>
    </>
  );
};

export default ForgotPassword;
