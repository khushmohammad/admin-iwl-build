import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Default from "../../layouts/default";
import axios from "axios";
import Pagination from "react-js-pagination";
//import { member } from "../../public/data/member";
import ModalForICEdit from "../../components/AdminComponent/ModalForICEdit";
import IcConfirmModal from "../../components/AdminComponent/IcConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllMembers } from "../../store/member";
import { getAllIc } from "../../store/ic";

function index() {
  const [currentpage, setCurrentpage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [countPerPage, setCountPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageStatus, setPageStatus] = useState("All");
  const [search, setSearch] = useState("");
   const [toggle,setToggle] =  useState(true)
  const dispatch = useDispatch();
  const Icdata = useSelector((state) => state?.icAction?.Ic);

  useEffect(() => {
    icmember(pageStatus, pageNumber, search);
  }, [pageNumber, pageStatus, search]);

  const icmember = (type, pageNumber, search) => {
    setPageStatus(type);
    dispatch(getAllIc({ type, pageNumber, search }));
  };
  const handlePageChange = (e) => {
    setCurrentpage(e);
    setPageNumber(e);
    icmember("All", e);
  };

  return (
    <Default>
      <Container>
        <Row as="ul" className="list-unstyled mb-0">
          {/* <Link href="/members/member-list" > */}

          <Col md="4" as="li">
            <Link
              href="ic"
              onClick={(e) => {
                setPageStatus("All");
                setPageNumber(1);
              }}
            >
              <Card>
                <Card.Body>
                  <div className="text-center">
                    <div>
                      <i className="icon material-symbols-outlined">group</i>
                    </div>
                    <div>All IC</div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md="4" as="li">
            <Link
              href="ic"
              onClick={(e) => {
                setPageStatus("Pending");
                setPageNumber(1);
                // member("Pending", 1, "");
              }}
            >
              <Card>
                <Card.Body>
                  <div className="text-center">
                    <div>
                      <i className="icon material-symbols-outlined">group</i>
                    </div>
                    <div>Pending IC</div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md="4" as="li">
            <Link
              href="ic"
              onClick={(e) => {
                setPageStatus("Approved");
                setPageNumber(1);
                // member("Approved", 1, "");
              }}
            >
              <Card>
                <Card.Body>
                  <div className="text-center">
                    <div>
                      <i className="icon material-symbols-outlined">group</i>
                    </div>
                    <div>Approved IC List</div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md="4" as="li">
            <Link
              href="ic"
              onClick={(e) => {
                setPageStatus("Decline");
                setPageNumber(1);
                // member("Decline", 1, "");
              }}
            >
              <Card>
                <Card.Body>
                  <div className="text-center">
                    <div>
                      <i className="icon material-symbols-outlined">group</i>
                    </div>
                    <div>Decline IC List</div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col className="ms-auto my-4" sm="4">
            <input
              className="form-control"
              value={search}
              placeholder="Search by Name"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>

        {loading ? (
          <h1 style={{ zIndex: 2 }}>Loading...</h1>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered  table-striped   ">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "16%" }}>
                    #
                  </th>
                  <th scope="col">FirstName</th>
                  <th scope="col">MiddleName</th>
                  <th scope="col">LastName</th>
                  <th scope="col">Username</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col">View</th>
                  <th scope="col">Verify</th>
                </tr>
              </thead>
              <tbody>
                {Icdata &&
                  Icdata?.docs &&
                  Icdata?.docs.length !== 0 &&
                  Icdata?.docs?.map((item, idx) => {
                    console.log(item.isIcApproved,"<<item>>")
                    return (
                      <tr key={idx}>
                        <th scope="row">{idx + 1}</th>
                        <td>{item.firstName}</td>
                        <td>{item.middleName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.userName}</td>
                        <td>{item.gender}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="text-center">
                          <button
                            className="border border-0"
                            onClick={() => {
                              setModalShow(true), setUserData(item);
                            }}
                          >
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          </button>
                        </td>
                        <td className="text-center">
                          {item.isIcApproved  ? (
                            <button
                              className="btn btn-success"
                              onClick={() => {
                                setModalConfirm(true), setUserData(item);
                              }}
                            >
                              <span className="material-symbols-outlined">
                                verified_user
                              </span>
                            </button>
                          ) : (
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                setModalConfirm(true), setUserData(item);
                              }}
                            >
                              <span className="material-symbols-outlined">
                                person_remove
                              </span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {Icdata && Icdata?.docs && Icdata?.docs.length === 0 && (
              <div className="text-center w-100"> "No Record Found!"</div>
            )}

            {userData && (
              <>
                <ModalForICEdit
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  apidata={userData && userData}
                />

                <IcConfirmModal
                  show={modalConfirm}
                  onHide={() => setModalConfirm(false)}
                  apidata={userData && userData}
                />
              </>
            )}

            <div className="d-flex justify-content-center mt-5">
              {Icdata && Icdata?.totalDocs !== 0 && (
                <Pagination
                  activePage={currentpage}
                  itemClass="page-item"
                  linkClass="page-link"
                  itemsCountPerPage={countPerPage}
                  totalItemsCount={Icdata?.totalDocs}
                  onChange={(e) => handlePageChange(e)}
                />
              )}
            </div>
          </div>
        )}
      </Container>
    </Default>
  );
}

export default index;
