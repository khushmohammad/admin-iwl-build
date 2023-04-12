import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { invitationViaLink } from "../../../services/user.service";

const schema = yup
  .object({
    emailId: yup
      .string()
      .required("Email is required")
      .email(),
  })
  .required();

const Sendinvitation = (props) => {
  const [showEmail, setShowEmail] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await invitationViaLink(data);
    } catch (error) {
      console.log(error);
    }

    props.onHide();
  };

  const handleClose = () => {
    props.onHide();
  };
  return (
    <Modal show={props.show} onHide={props.hide} style={{ top: "8%" }}>
      <Modal.Header>
        <Modal.Title>Send Invitation</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <div className="mb-3">
            <Form.Floating>
              <Form.Control
                {...register("emailId")}
                id="floatingInputCustom"
                type={showEmail ? "text" : "email"}
                placeholder="name@example.com"
                className="form-control"
                required
              />
              <Form.Label htmlFor="floatingInputCustom">Email</Form.Label>
            </Form.Floating>
            {errors.emailId && (
              <p style={{ color: "red" }}>{errors.emailId.message}</p>
            )}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
          {/* {props.planid ? "Update" : "Create"} */}
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Sendinvitation;
