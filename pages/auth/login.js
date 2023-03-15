import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import Auth from "../../layouts/auth";
import ReCAPTCHA from "react-google-recaptcha";

const schema = yup
  .object({
    userName: yup
      .string()
      .required("Email is required")
      .email(),
    password: yup.string().required("Password is required"),
  })
  .required();

const Login = () => {
  const [ShowPage, setShowPage] = useState(null);
  const [ApiError, setApiError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [verified, setVerified] = useState(false);
  const [remember, setRemember] = useState(true);

  const router = useRouter();

  //config form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onChangeValue = (value) => {
    setVerified(true);
  };
  //check valid user
  const GetSession = async () => {
    const session = await getSession();
    if (session) {
      router.push("/");
    } else {
      setShowPage(true);
    }
  };

  useEffect(() => {
    GetSession();
  }, []);

  const onSubmit = (data) => {
    // console.log(data);
    handleClick(data);
  };

  const handleClick = async (data) => {
    const userdata = JSON.stringify(data);
    console.log("data::", userdata);
    try {
      const res = await signIn("credentials", {
        userdata,
        redirect: false,
        callbackUrl: "/",
      });

      if (res.ok) {
        router.push("/");
      } else {
        setApiError("Invalid User Name or Password");
      }
    } catch (err) {
      setApiError(`Something went wrong in api`);
    }
  };

  return (
    <>
      {/* {JSON.stringify(process.env.NEXT_PUBLIC_API_PATH)} */}
      {ShowPage && ShowPage ? (
        <Auth>
          <div className="sign-in-from">
            <h1 className="mb-0">Login</h1>
            {/* <p>Enter your email address and password to access admin panel.</p> */}
            {ApiError && ApiError ? (
              <div className="p-2 my-2 text-center text-danger bg-dark">
                {ApiError}
              </div>
            ) : null}
            <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <Form.Floating>
                  <Form.Control
                    {...register("userName")}
                    id="floatingInputCustom"
                    type={showEmail ? "text" : "email"}
                    placeholder="name@example.com"
                    className="form-control"
                    required
                  />
                  <label htmlFor="floatingInputCustom">Email address</label>
                </Form.Floating>
                {errors.userName && (
                  <p style={{ color: "red" }}>{errors.userName.message}</p>
                )}
              </div>

              <div className="mb-2">
                <Form.Floating>
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
                    role="button"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    className="icon cursor-pointer material-symbols-outlined material-icons-outlined position-absolute top-50 pwd-icon translate-middle-y"
                  >
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </Form.Floating>
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password.message}</p>
                )}
              </div>
              <Link href="/auth/forgot-password" className="float-start mb-3">
                Forgot password?
              </Link>
              <div className="d-inline-block w-100">
                <Form.Check className="d-inline-block mt-2 pt-1 p-3">
                  <Form.Check.Input
                    type="checkbox"
                    className="me-2"
                    id="customCheck11"
                    defaultChecked
                    {...register("remember")}
                  />
                  <Form.Check.Label>Remember Me</Form.Check.Label>
                </Form.Check>
                <div className="mb-3 ">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
                    onChange={onChangeValue}
                  />
                </div>
                <Button
                  variant="primary"
                  type="submit"
                  className="float-end"
                  disabled={!verified}
                >
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Auth>
      ) : null}
    </>
  );
};

export default Login;
