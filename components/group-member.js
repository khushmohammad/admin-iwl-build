import Link from "next/link";
import React from "react";
import { Card, Col, Container, Modal, Row } from "react-bootstrap";

// images
import user5 from "../public/assets/images/user/05.jpg";
import user6 from "../public/assets/images/user/06.jpg";
import user7 from "../public/assets/images/user/07.jpg";
import user8 from "../public/assets/images/user/08.jpg";
import user9 from "../public/assets/images/user/09.jpg";
import user10 from "../public/assets/images/user/10.jpg";
import user11 from "../public/assets/images/user/11.jpg";
import user12 from "../public/assets/images/user/12.jpg";
import user13 from "../public/assets/images/user/13.jpg";
import user14 from "../public/assets/images/user/14.jpg";
import user15 from "../public/assets/images/user/15.jpg";
import user16 from "../public/assets/images/user/16.jpg";
import user17 from "../public/assets/images/user/17.jpg";
import Image from "next/image";

const GroupMemeber = (props) => {
  return (
    <Modal {...props} size="lg" style={{ top: "8%" }}>
      <Modal.Header className="d-flex justify-content-between">
        <h5 className="modal-title" id="post-modalLabel">
          Group Members
        </h5>
        <button
          type="button"
          className="btn btn-secondary lh-1"
          onClick={props.onHide}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col sm="12">
              <Card>
                {/* <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Friend Request</h4>
                  </div>
                </Card.Header> */}
                <Card.Body>
                  <ul className="request-list list-inline m-0 p-0">
                    <li className="d-flex align-items-center  justify-content-between flex-wrap">
                      <div className="user-img img-fluid flex-shrink-0">
                        <Image
                          src={user5}
                          alt="story-img"
                          className="rounded-circle avatar-40"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6>Jaques Amole</h6>
                        <p className="mb-0">40 friends</p>
                      </div>
                      <div className="d-flex align-items-center mt-2 mt-md-0">
                        <div className="confirm-click-btn">
                          <Link
                            href="#"
                            className="me-3 btn btn-primary rounded confirm-btn"
                          >
                            Confirm
                          </Link>
                          <Link
                            href="#"
                            className="me-3 btn btn-primary rounded request-btn"
                            style={{ display: "none" }}
                          >
                            View All
                          </Link>
                        </div>
                        <Link
                          href="#"
                          // onClick={questionAlert}
                          className="btn btn-secondary rounded"
                          data-extra-toggle="delete"
                          data-closest-elem=".item"
                        >
                          Delete Request
                        </Link>
                      </div>
                    </li>
                    <li className="d-flex align-items-center  justify-content-between flex-wrap">
                      <div className="user-img img-fluid flex-shrink-0">
                        <Image
                          src={user6}
                          alt="story-img"
                          className="rounded-circle avatar-40"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6>Lucy Tania</h6>
                        <p className="mb-0">12 friends</p>
                      </div>
                      <div className="d-flex align-items-center mt-2 mt-md-0">
                        <div className="confirm-click-btn">
                          <Link
                            href="#"
                            className="me-3 btn btn-primary rounded confirm-btn"
                          >
                            Confirm
                          </Link>
                          <Link
                            href="#"
                            className="me-3 btn btn-primary rounded request-btn"
                            style={{ display: "none" }}
                          >
                            View All
                          </Link>
                        </div>
                        <Link
                          href="#"
                          // onClick={questionAlert}
                          className="btn btn-secondary rounded"
                          data-extra-toggle="delete"
                          data-closest-elem=".item"
                        >
                          Delete Request
                        </Link>
                      </div>
                    </li>
                    <li className="d-flex align-items-center flex-wrap">
                      <div className="user-img img-fluid flex-shrink-0">
                        <Image
                          src={user7}
                          alt="story-img"
                          className="rounded-circle avatar-40"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6>Val Adictorian</h6>
                        <p className="mb-0">0 friends</p>
                      </div>
                      <div className="d-flex align-items-center mt-2 mt-md-0">
                        <div className="confirm-click-btn">
                          <Link
                            href="#"
                            className="me-3 btn btn-primary rounded confirm-btn"
                          >
                            Confirm
                          </Link>
                          <Link
                            href="#"
                            className="me-3 btn btn-primary rounded request-btn"
                            style={{ display: "none" }}
                          >
                            View All
                          </Link>
                        </div>
                        <Link
                          href="#"
                          // onClick={questionAlert}
                          className="btn btn-secondary rounded"
                          data-extra-toggle="delete"
                          data-closest-elem=".item"
                        >
                          Delete Request
                        </Link>
                      </div>
                    </li>
                    <li className="d-flex align-items-center flex-wrap">
                      <div className="user-img img-fluid flex-shrink-0">
                        <Image
                          src={user8}
                          alt="story-img"
                          className="rounded-circle avatar-40"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6>Manny Petty</h6>
                        <p className="mb-0">3 friends</p>
                      </div>
                      <div className="d-flex align-items-center mt-2 mt-md-0">
                        <Link href="#" className="me-3 btn btn-primary rounded">
                          Confirm
                        </Link>
                        <Link
                          href="#"
                          // onClick={questionAlert}
                          className="btn btn-secondary rounded"
                          data-extra-toggle="delete"
                          data-closest-elem=".item"
                        >
                          Delete Request
                        </Link>
                      </div>
                    </li>
                    <li className="d-flex align-items-center  flex-wrap">
                      <div className="user-img img-fluid flex-shrink-0">
                        <Image
                          src={user9}
                          alt="story-img"
                          className="rounded-circle avatar-40"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6>Marsha Mello</h6>
                        <p className="mb-0">15 friends</p>
                      </div>
                      <div className="d-flex align-items-center mt-2 mt-md-0">
                        <Link href="#" className="me-3 btn btn-primary rounded">
                          Confirm
                        </Link>
                        <Link
                          href="#"
                          // onClick={questionAlert}
                          className="btn btn-secondary rounded"
                          data-extra-toggle="delete"
                          data-closest-elem=".item"
                        >
                          Delete Request
                        </Link>
                      </div>
                    </li>
                    <li className="d-flex align-items-center  flex-wrap">
                      <div className="user-img img-fluid flex-shrink-0">
                        <Image
                          src={user10}
                          alt="story-img"
                          className="rounded-circle avatar-40"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6>Caire Innet</h6>
                        <p className="mb-0">8 friends</p>
                      </div>
                      <div className="d-flex align-items-center mt-2 mt-md-0">
                        <Link href="#" className="me-3 btn btn-primary rounded">
                          Confirm
                        </Link>
                        <Link
                          href="#"
                          // onClick={questionAlert}
                          className="btn btn-secondary rounded"
                          data-extra-toggle="delete"
                          data-closest-elem=".item"
                        >
                          Delete Request
                        </Link>
                      </div>
                    </li>
                    <li className="d-flex align-items-center  flex-wrap">
                      <div className="user-img img-fluid flex-shrink-0">
                        <Image
                          src={user11}
                          alt="story-img"
                          className="rounded-circle avatar-40"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6>Gio Metric</h6>
                        <p className="mb-0">10 friends</p>
                      </div>
                      <div className="d-flex align-items-center mt-2 mt-md-0">
                        <Link href="#" className="me-3 btn btn-primary rounded">
                          Confirm
                        </Link>
                        <Link
                          href="#"
                          // onClick={questionAlert}
                          className="btn btn-secondary rounded"
                          data-extra-toggle="delete"
                          data-closest-elem=".item"
                        >
                          Delete Request
                        </Link>
                      </div>
                    </li>
                    <li className="d-flex align-items-center  flex-wrap">
                      <div className="user-img img-fluid flex-shrink-0">
                        <Image
                          src={user12}
                          alt="story-img"
                          className="rounded-circle avatar-40"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6>Chris P. Cream</h6>
                        <p className="mb-0">18 friends</p>
                      </div>
                      <div className="d-flex align-items-center mt-2 mt-md-0">
                        <Link href="#" className="me-3 btn btn-primary rounded">
                          Confirm
                        </Link>
                        <Link
                          href="#"
                          // onClick={questionAlert}
                          className="btn btn-secondary rounded"
                          data-extra-toggle="delete"
                          data-closest-elem=".item"
                        >
                          Delete Request
                        </Link>
                      </div>
                    </li>
                    <li className="d-flex align-items-center  flex-wrap">
                      <div className="user-img img-fluid flex-shrink-0">
                        <Image
                          src={user13}
                          alt="story-img"
                          className="rounded-circle avatar-40"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6>Paul Misunday</h6>
                        <p className="mb-0">6 friends</p>
                      </div>
                      <div className="d-flex align-items-center mt-2 mt-md-0">
                        <Link href="#" className="me-3 btn btn-primary rounded">
                          Confirm
                        </Link>
                        <Link
                          href="#"
                          // onClick={questionAlert}
                          className="btn btn-secondary rounded"
                          data-extra-toggle="delete"
                          data-closest-elem=".item"
                        >
                          Delete Request
                        </Link>
                      </div>
                    </li>

                    <li className="d-block text-center mb-0 pb-0">
                      <Link href="#" className="me-3 btn btn-primary">
                        View More Request
                      </Link>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default GroupMemeber;
