import React from "react";
import { Button, Form } from "react-bootstrap";

import { useRouter } from "next/router";

import Auth from "../../layouts/auth";

const Recoverpw = () => {
  let history = useRouter();
  return (
    <Auth>
      <div className="sign-in-from">
        <h1 className="mb-0">Reset Password</h1>
        <p>
          Enter your email address and we'll send you an email with instructions
          to reset your password.
        </p>
        <Form className="mt-4">
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              className="mb-0"
              id="exampleInputEmail1"
              placeholder="Enter email"
            />
          </Form.Group>
          <div className="d-inline-block w-100">
            <Button
              variant="primary"
              type="button"
              className="float-right mt-3"
              onClick={() => history.push("/auth/sign-in")}
            >
              Reset Password
            </Button>
          </div>
        </Form>
      </div>
    </Auth>
  );
};

export default Recoverpw;
