import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans, getPlanDetail } from "../../../store/subscription";
import {
  createSubscriptionPlanService,
  updateSubscriptionPlanService,
} from "../../../services/subscription.service";

const schema = yup
  .object({
    label: yup.string().required("Label is required"),
    price: yup
      .number()
      .positive()
      .typeError("Price must be a number")
      .required("Price is required"),
    details: yup.string().required("Details is required"),
  })
  .required();

const Editor = dynamic(() => import("../../../components/Editor"), {
  ssr: false,
});

const AddSubscriptionPlans = (props) => {
  const [renewalPlanId, setRenewalPlanId] = useState(null);
  const [renewalPlan, setRenewalPlan] = useState("");
  const dispatch = useDispatch();

  //config form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    unregister,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { renewalType, currency, planDetail } = useSelector(
    (state) => state?.subscription
  );

  useEffect(() => {
    const result = renewalType?.filter((type) => type._id === renewalPlanId);
    setRenewalPlan(result[0]?.dropdownValue.split("/")[1]);
  }, [renewalPlanId]);

  useEffect(() => {
    if (props.planid) {
      dispatch(getPlanDetail(props.planid));
    }
  }, [props.planid]);

  useEffect(() => {
    if (props.planid) {
      setValue("label", planDetail?.label);
      setValue("price", planDetail?.price);
      // setValue("currency", planDetail?.currency);
      // setValue("renewal_type", planDetail?.renewal_type?.split("/")[0]);
      setValue("details", planDetail?.details);

      setRenewalPlan(planDetail?.renewal_type?.split("/")[1]);
    }
  }, [planDetail]);

  const onSubmit = async (data) => {
    unregister("plan");
    let res = null;
    if (props.planid) {
      res = await updateSubscriptionPlanService(props.planid, data);
    } else {
      res = await createSubscriptionPlanService(data);
    }
    if (res?.success) {
      dispatch(getAllPlans());
      reset();
      props.setplanid();
      setRenewalPlan("Month");
      setValue("details", "");
      props.onHide();
    }
  };

  const handleClose = () => {
    props.setplanid();
    setRenewalPlan("Month");
    reset();
    setValue("details", "");
    props.onHide();
  };

  return (
    <Modal show={props.show} onHide={props.onHide} style={{ top: "8%" }}>
      <Modal.Header>
        <Modal.Title>Add Subscription Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col className="col-8">
              <div className="mb-3">
                <Form.Select
                  {...register("renewal_type")}
                  onChange={(e) => setRenewalPlanId(e.target.value)}
                >
                  {renewalType &&
                    renewalType?.length !== 0 &&
                    renewalType?.map((type, index) => (
                      <option
                        key={index}
                        selected={
                          props.planid
                            ? type.dropdownValue === planDetail?.renewal_type
                            : false
                        }
                        value={type?._id}
                      >
                        {type?.dropdownValue.split("/")[0]}
                      </option>
                    ))}
                </Form.Select>
              </div>
            </Col>
            <Col>
              <div className="mb-3">
                <Form.Floating>
                  <Form.Control
                    disabled
                    id="floatingInputCustom"
                    type="text"
                    value={renewalPlan}
                    placeholder="type"
                    className="form-control"
                  />
                  <Form.Label htmlFor="floatingInputCustom">Type</Form.Label>
                </Form.Floating>
              </div>
            </Col>
          </Row>
          <div className="mb-3">
            <Form.Floating>
              <Form.Control
                {...register("label")}
                id="floatingInputCustom"
                type="text"
                placeholder="type"
                className="form-control"
                required
              />
              <Form.Label htmlFor="floatingInputCustom">Label</Form.Label>
            </Form.Floating>
            {errors.label && (
              <p style={{ color: "red" }}>{errors.label.message}</p>
            )}
          </div>
          <Row>
            <Col className="col-8">
              <div className="mb-3">
                <Form.Floating>
                  <Form.Control
                    {...register("price")}
                    id="floatingInputCustom"
                    type="number"
                    placeholder="type"
                    className="form-control"
                    required
                  />
                  <Form.Label htmlFor="floatingInputCustom">Price</Form.Label>
                </Form.Floating>
                {errors.price && (
                  <p style={{ color: "red" }}>{errors.price.message}</p>
                )}
              </div>
            </Col>
            <Col>
              <div className="mb-3">
                <Form.Select {...register("currency")}>
                  {currency &&
                    currency.length !== 0 &&
                    currency?.map((curr, index) => (
                      <option
                        key={index}
                        value={curr?._id}
                        selected={
                          props.planid
                            ? curr.dropdownValue === planDetail?.currency
                            : false
                        }
                      >
                        {curr?.dropdownValue}
                      </option>
                    ))}
                </Form.Select>
              </div>
            </Col>
          </Row>
          <div className="mb-3">
            <Form.Floating>
              <Form.Label htmlFor="details">Plan Detail</Form.Label>
              <Controller
                {...register("details")}
                id="details"
                placeholder="details"
                type="text"
                name="details"
                control={control}
                render={({ field }) => <Editor {...field} />}
                required
              />
            </Form.Floating>
            {errors.details && (
              <p style={{ color: "red" }}>{errors.details.message}</p>
            )}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
          {props.planid ? "Update" : "Create"}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSubscriptionPlans;
