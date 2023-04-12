import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { actionOnReport } from "../../../services/posts.service";

const schema = yup
  .object({
    adminRemark: yup
      .string()
      .min(3)
      .max(150)
      .typeError("Select is required")
      .required("Select is required"),
  })
  .required();

const ReportedPost = ({ show, onHide, postDetails }) => {
  const [otherText, setOtherText] = useState("");

  //form validate and config
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const fillInput = (event) => {
    const { value } = event.target;
    setOtherText(value);
  };

  const onSubmit = async (data, name, val) => {
    try {
      let payload = {
        [name]: Boolean(val),
        ...data,
      };
      const response = await actionOnReport(postDetails.postId, payload);
      setOtherText("");
      onHide();
    } catch (err) {
      console.log("error", err);
    }
  };

  const formSubmit = (event) => {
    const { name, value } = event.target;
    handleSubmit((data) => onSubmit(data, name, value))();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {postDetails && postDetails.postDet.length > 0 && (
          <div>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Reported By</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {postDetails.postDet.length > 0 &&
                  postDetails.postDet.map((elem, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {elem.userInfo.firstName} {elem.userInfo.lastName}
                      </td>
                      <td>{elem.reason}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        )}
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                {...register("adminRemark")}
                as="textarea"
                name="adminRemark"
                rows={1}
                value={otherText}
                onChange={(e) => fillInput(e)}
                placeholder="Remark Message..."
              />
            </Form.Group>
            {errors.adminRemark && (
              <div style={{ color: "red" }}>{errors.adminRemark.message}</div>
            )}
            <Button
              variant="primary"
              type="button"
              name="hideStatus"
              value={true}
              className="mx-2"
              onClick={formSubmit}
            >
              Hide Post
            </Button>
            <Button
              variant="secondary"
              type="button"
              name="hideStatus"
              value={false}
              onClick={formSubmit}
            >
              Ignore Post
            </Button>
          </Form>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default ReportedPost;
