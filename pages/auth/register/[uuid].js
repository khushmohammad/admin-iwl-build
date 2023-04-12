import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { getSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import * as yup from "yup";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { parse, isDate } from "date-fns";
import Auth from "../../../layouts/auth";
import AsyncSelect from "react-select/async";
import moment from "moment";
import { verifyRegisterLinkService } from "../../../services/user.service";

const date = new Date();

const schema = yup
  .object({
    firstName: yup
      .string()
      .required("Must have minimun 3 characters")
      .min(3)
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    lastName: yup
      .string()
      .required("Must have minimun 3 characters")
      .min(3)
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    userName: yup
      .string()
      .email()
      .required("Email is required"),
    country: yup
      .object()
      .nullable()
      .required("Country is required"),
    dateOfBirth: yup
      .date()
      .transform(function(value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(originalValue, "dd-MMM-yyyy", new Date());
        console.log(result);
        return result;
      })
      .typeError("please enter a valid date")
      .required()
      .test(
        "DOB",
        "Age should be greater than or equal to 18",
        (date) => moment().diff(moment(date), "years") >= 18
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(8),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password doesn't match")
      .required("Confirm password is required"),
  })
  .required();

const Register = () => {
  const [ShowPage, setShowPage] = useState(null);
  const [ApiError, setApiError] = useState();
  const [registerLinkError, setRegisterLinkError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAcceptTerms, setIsAcceptTerms] = useState(false);

  const [countriesDataArrayObj, setCountriesDataArrayObj] = useState();

  const router = useRouter();

  const { uuid } = router.query;

  console.log(uuid, ": uuid");
  //form validate and config
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  //check valid user
  async function GetSession() {
    const session = await getSession();
    if (session) {
      router.push("/");
    } else {
      setShowPage(true);
    }
  }

  const verifyRegisterLink = async () => {
    try {
      const res = await verifyRegisterLinkService(uuid);
      console.log("res:: ", res);
      if (res?.success) {
        setValue("userName", res?.body?.emailAddress);
      }
    } catch (error) {
      console.log("errr:: ", error.response.data.message);
      setRegisterLinkError(error.response.data.message);
    }
  };

  useEffect(() => {
    GetSession();
  }, []);

  useEffect(() => {
    if (uuid !== undefined) verifyRegisterLink();
  }, [uuid]);

  const onSubmit = (data) => {
    const payload = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      userName: data.userName,
      gender: data.gender,
      password: data.password,
      dateOfBirth: data.dateOfBirth,
      country: data.country.value,
      acceptTermsAndConditions: data.acceptTermsAndConditions,
      isSocialMediaSignup: false,
    };
    unregister("confirmPassword");
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_PATH}/users/account/signup?uniqueId=${uuid}`,
        payload
      )
      .then((res) => {
        if (res.status === 200) {
          router.push("/auth/registration-status");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        let error = err.response.data.message;
        setApiError((prevState) => error);
      });
  };

  // country list on search
  const promiseOptions = async (inputValue) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/users/country/all/${inputValue}`
    );
    const countri = await res.data.body;
    let newArrayOBj1 = [];
    countri.forEach((element) => {
      const data = { value: element.id, label: element.name };
      return newArrayOBj1.push(data);
    });
    setCountriesDataArrayObj(newArrayOBj1);
    return newArrayOBj1;
  };

  const getCountry = async (inputValue) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/users/country/all`
    );
    const countri = await res.data.body;
    let newArrayOBj1 = [];
    countri.forEach((element) => {
      const data = { value: element.id, label: element.name };
      return newArrayOBj1.push(data);
    });
    setCountriesDataArrayObj(newArrayOBj1);
  };
  useEffect(() => {
    getCountry();
  }, []);

  return (
    <>
      {ShowPage && ShowPage ? (
        <Auth>
          {registerLinkError ? (
            <>
              <h1 className="mb-4 text-5xl font-medium leading-tight">
                {registerLinkError}
              </h1>
              <Button onClick={() => router.push("/auth/login")}>
                Go to Login
              </Button>
            </>
          ) : (
            <div className="sign-in-from">
              <h1 className="mb-0">Register</h1>
              {ApiError && ApiError ? (
                <div className="p-2 my-2 text-center text-danger bg-dark">
                  {ApiError}
                </div>
              ) : null}
              <Form
                className="mt-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Form.Floating className="mb-3">
                  <Form.Control
                    {...register("userName")}
                    id="floatingInputCustom"
                    disabled
                    type="email"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInputCustom">Email address</label>
                </Form.Floating>

                <Form.Floating className="mb-3">
                  <Form.Control
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                  <span
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    className="icon cursor-pointer material-symbols-outlined material-icons-outlined position-absolute top-50 pwd-icon translate-middle-y"
                  >
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                  {errors.password && (
                    <div className="text-danger">{errors.password.message}</div>
                  )}
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    id="cfrmPassword"
                    placeholder="Confirm Password"
                  />
                  <label htmlFor="cfrmPassword">Confirm Password</label>
                  <span
                    onClick={() =>
                      setShowConfirmPassword((prevState) => !prevState)
                    }
                    className="icon cursor-pointer material-symbols-outlined material-icons-outlined position-absolute top-50 pwd-icon translate-middle-y"
                  >
                    {showConfirmPassword ? "visibility" : "visibility_off"}
                  </span>
                  {errors.confirmPassword && (
                    <div className="text-danger">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    {...register("firstName")}
                    type="text"
                    className="form-control"
                    id="fName"
                    placeholder="First Name"
                    required
                  />
                  <label htmlFor="fName">First Name</label>
                  {errors.firstName && (
                    <div className="text-danger">
                      {errors.firstName.message}
                    </div>
                  )}
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    {...register("lastName")}
                    type="text"
                    className="form-control"
                    id="lName"
                    placeholder="Last Name"
                  />
                  <label htmlFor="lName">Last Name</label>
                  {errors.lastName && (
                    <div className="text-danger">{errors.lastName.message}</div>
                  )}
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field: { name, value, onChange, onBlur } }) => (
                      <DatePicker
                        selected={value}
                        preventOpenOnFocus={true}
                        dateFormat="dd-MMM-yyyy"
                        placeholderText="dd-MMM-yyyy"
                        onBlur={onBlur}
                        onChange={(date) => {
                          onChange(date);
                          onBlur();
                        }}
                        className="form-control"
                      />
                    )}
                  />
                  {/* <label htmlFor="DOB">Date of Birth</label> */}
                  {errors.dateOfBirth && (
                    <div className="text-danger">
                      {errors.dateOfBirth.message}
                    </div>
                  )}
                </Form.Floating>
                <Form.Group className="mb-4">
                  {/* <Form.Label>Gender</Form.Label> */}
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field: { onChange, value } }) => (
                      <fieldset
                        className="form-group"
                        value={value}
                        onChange={onChange}
                      >
                        <label className="form-label">Gender</label>
                        <div>
                          <div className="form-check custom-radio form-check-inline">
                            <input
                              type="radio"
                              id="male"
                              name="gender"
                              value="Male"
                              className="form-check-input"
                            />
                            <label className="form-check-label" htmlFor="male">
                              Male
                            </label>
                          </div>
                          <div className="form-check custom-radio form-check-inline">
                            <input
                              type="radio"
                              id="female"
                              name="gender"
                              value="Female"
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="female"
                            >
                              Female
                            </label>
                          </div>
                          <div className="form-check custom-radio form-check-inline">
                            <input
                              type="radio"
                              id="other"
                              name="gender"
                              value="Other"
                              className="form-check-input"
                            />
                            <label className="form-check-label" htmlFor="other">
                              Other
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    )}
                  />
                </Form.Group>
                <Form.Group className="mb-4 position-relative ">
                  <label
                    htmlFor="country"
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "11px",
                      zIndex: "1",
                      background: "#fff",
                      padding: "0px 6px",
                    }}
                  >
                    Country
                  </label>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <AsyncSelect
                        {...field}
                        defaultOptions={countriesDataArrayObj}
                        loadOptions={promiseOptions}
                      />
                    )}
                  />
                  {/* <label htmlFor="DOB">Date of Birth</label> */}
                  {errors.country && (
                    <div className="text-danger">{errors.country.message}</div>
                  )}
                </Form.Group>

                <div className="d-inline-block w-100">
                  <div className="form-check d-inline-block mt-2 pt-1">
                    <input
                      {...register("acceptTermsAndConditions")}
                      name="acceptTermsAndConditions"
                      type="checkbox"
                      className="form-check-input"
                      id="customCheck11"
                      value={isAcceptTerms}
                      onChange={() =>
                        setIsAcceptTerms((prevState) => !prevState)
                      }
                    />
                    <label className="form-check-label" htmlFor="customCheck11">
                      I accept all{" "}
                      <Link href="/auth/terms-conditions">
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                </div>

                <div className="d-inline-block w-100">
                  <button
                    type="submit"
                    className="btn btn-primary float-end"
                    disabled={!isAcceptTerms}
                  >
                    Sign Up
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Auth>
      ) : null}
    </>
  );
};

export default Register;
