import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import * as yup from "yup";
import Link from "next/link";
import axios from "axios";
import { parse, isDate } from "date-fns";
import Auth from "../../layouts/auth";

const date = new Date();

const schema = yup
  .object({
    country: yup.string(),
    dateOfBirth: yup
      .date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(originalValue, "dd-MMM-yyyy", new Date());
        console.log(result);
        return result;
      })
      .typeError("please enter a valid date")
      .required()
      .max(
        `01-01-${date.getFullYear() - 18}`,
        "Age should be greater than or equal to 18"
      ),
  })
  .required();

const LockScreen = ({ countries }) => {
  const { data: session } = useSession();
  console.log("session: ", session);
  const router = useRouter();

  const [name, setName] = useState([]);
  const [ShowPage, setShowPage] = useState(null);
  const [ApiError, setApiError] = useState();
  const [isEmailExist, setIsEmailExist] = useState();
  const [isAccountActivated, setIsAccountActivated] = useState();
  const [isAcceptTerms, setIsAcceptTerms] = useState(false);

  //form validate and config
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  //check valid user
  const checkEmailRegistered = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_PATH}/users/userInfo/${
          session && session.user.email
        }`
      )
      .then((res) => {
        setIsEmailExist(res.data.body.isEmailPresent);
      })
      .catch((err) => console.log(err));

    if (isEmailExist) {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_PATH}/users/account/login`, {
          userName: session && session.user.email,
          password: null,
          isSocialMediaLogin: true,
        })
        .then((res) => {
          router.push("/");
        })
        .catch((err) => {
          setIsAccountActivated(err.response.data.errors.isAccountVerified);
        });
    } else {
      if (isAccountActivated) {
        setShowPage(true);
        setName(session && session.user.name.split(" "));
      }
      router.push("/auth/verifyEmail/_._");
      signOut();
    }
  };

  useEffect(() => {
    checkEmailRegistered();
  }, [session]);

  const onSubmit = (data) => {
    setValue("userName", session && session.user.email);
    setValue("firstName", name && name[0]);
    setValue("lastName", name && name[1]);
    setValue("password", null);
    setValue("isSocialMediaLogin", true);

    console.log(data);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_PATH}/users/account/signup`, data)
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
  return (
    <>
      {ShowPage && ShowPage ? (
        <Auth>
          <div className="sign-in-from">
            <h4 className="mt-3 mb-0">Hi ! {session && session.user.name} </h4>
            <Form className="mt-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                {errors.dateOfBirth && (
                  <div className="text-danger">
                    {errors.dateOfBirth.message}
                  </div>
                )}
              </Form.Floating>
              <Form.Group className="mb-4">
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
                          <label className="form-check-label" htmlFor="female">
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
              <Form.Floating className="mb-3">
                <select
                  className="form-select"
                  id="country"
                  aria-label="Country"
                  {...register("country")}
                >
                  <option defaultValue hidden>
                    Country
                  </option>
                  {countries?.map((country) => (
                    <option key={country._id} value={country._id}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="country">Country</label>
              </Form.Floating>

              <div className="d-inline-block w-100">
                <div className="form-check d-inline-block mt-2 pt-1">
                  <input
                    {...register("acceptTermsAndConditions")}
                    name="acceptTermsAndConditions"
                    type="checkbox"
                    className="form-check-input"
                    id="customCheck11"
                    value={isAcceptTerms}
                    onChange={() => setIsAcceptTerms((prevState) => !prevState)}
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
                  Continue
                </button>
              </div>
            </Form>
          </div>
        </Auth>
      ) : null}
    </>
  );
};

export default LockScreen;

export const getServerSideProps = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/users/country/all`
  );
  const countries = await res.data.body;

  return {
    props: {
      countries,
    },
  };
};
