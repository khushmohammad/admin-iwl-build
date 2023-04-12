import React, { useEffect, useState } from "react";
import { Button, Card, Container, Dropdown, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomToggle from "../../components/dropdowns";
import ConfirmBox from "../../components/modals/ConfirmBox";
import AddSubscriptionPlans from "../../components/modals/subscription/AddSubscriptionPlans";
import Default from "../../layouts/default";
import { getAllPlans, getRenewalType } from "../../store/subscription";

const Subscription = () => {
  const [show, setShow] = useState(false);
  const [planId, setPlanId] = useState(null);
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  const dispatch = useDispatch();

  const { plans } = useSelector((state) => state?.subscription);

  useEffect(() => {
    dispatch(getAllPlans());
    dispatch(getRenewalType("accountDuration"));
    dispatch(getRenewalType("currency"));
  }, []);

  const editPlan = (planid) => {
    setShow(true);
    setPlanId(planid);
  };

  const deletePlan = async (planid) => {
    setShowConfirmBox(true);
    setPlanId(planid);
  };

  return (
    <Default>
      <AddSubscriptionPlans
        show={show}
        onHide={() => setShow(false)}
        planid={planId}
        setplanid={() => setPlanId(null)}
      />
      <ConfirmBox
        show={showConfirmBox}
        planid={planId}
        setplanid={() => setPlanId(null)}
        onHide={() => setShowConfirmBox(false)}
        Message="Are you sure, you want to delete this plan"
      />
      <Container>
        <div id="content-page" className="content-page">
          <div className="container">
            <Row>
              <div className="col-sm-12">
                <Card className="inner-page-bg bg-primary p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="text-white">Subscription Plans</h3>
                    {/* <p className="text-white">lorem ipsum</p> */}
                    <Button variant="secondary" onClick={() => setShow(true)}>
                      Add New Plan
                    </Button>
                  </div>
                </Card>
              </div>
              {plans &&
                plans.length !== 0 &&
                plans?.map((plan, index) => (
                  <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                    <Card>
                      <Card.Body className="border text-center rounded">
                        <div className="d-flex position-relative justify-content-center text-primary">
                          <span className="text-uppercase">{plan?.label}</span>

                          <Dropdown
                            className="dropdown-toggle-main ms-2 position-absolute"
                            style={{ right: "-10px" }}
                          >
                            <Dropdown.Toggle
                              as={CustomToggle}
                              id="post-option"
                              className="d-flex"
                            >
                              <span className="material-symbols-outlined">
                                more_vert
                              </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                              className=" dropdown-menu-right"
                              aria-labelledby="post-option"
                            >
                              <Dropdown.Item
                                onClick={() => editPlan(plan?._id)}
                              >
                                Edit Plan
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => deletePlan(plan?._id)}
                              >
                                Delete Plan
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="mt-3 d-flex align-items-center justify-content-center">
                          <h2 className="mb-4 display-6">${plan.price}</h2>
                          <small className="text-muted">
                            / {plan?.renewal_type.split("/")[1]}
                          </small>
                        </div>
                        <div
                          className="list-unstyled text-start line-height-4 mb-0"
                          dangerouslySetInnerHTML={{
                            __html: plan.details,
                          }}
                        ></div>
                        <Button className="btn btn-primary mt-5">
                          Subscribe
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
            </Row>
          </div>
        </div>
      </Container>
    </Default>
  );
};

export default Subscription;
