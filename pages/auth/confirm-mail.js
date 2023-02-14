import React from "react";
import { Button } from "react-bootstrap";
// import {Link} from 'react-router-dom'
// import { useHistory } from 'react-router-dom'

//image
import mail from "../../public/assets/images/login/mail.png";
import { useRouter } from "next/router";

import Image from "next/image";
import Auth from "../../layouts/auth";

const ConfirmMail = () => {
  let history = useRouter();
  return (
    <Auth>
      <div className="sign-in-from">
        <Image src={mail} width="80" alt="" />
        <h1 className="mt-3 mb-0">Success !</h1>
        <p>
          A email has been send to youremail@domain.com. Please check for an
          email from company and click on the included link to reset your
          password.
        </p>
        <div className="d-inline-block w-100">
          <Button
            type="button"
            onClick={() => history.push("/")}
            variant="primary"
            className="mt-3"
          >
            <span className="d-flex align-items-center">
              <i className="material-symbols-outlined md-18 me-1">home</i>
              Back to Home
            </span>
          </Button>
        </div>
      </div>
    </Auth>
  );
};

export default ConfirmMail;
