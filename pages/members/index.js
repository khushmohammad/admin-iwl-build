import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Default from "../../layouts/default";
import Pagination from "react-js-pagination";
import ModalForEdit from "../../components/AdminComponent/ModalForEdit";
import ConfirmModal from "../../components/AdminComponent/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllMembers } from "../../store/member";

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

  const dispatch = useDispatch();
  const members = useSelector((state) => state?.member?.members);


  useEffect(() => {
    member(pageStatus, pageNumber, search);
  }, [pageNumber, pageStatus, search]);

  // useEffect(() => {
  //   if (search !== "") member(pageStatus, 1, search);
  // }, [search]);

  const member = (type, pageNumber, search) => {
    setPageStatus(type);
    dispatch(getAllMembers({ type, pageNumber, search }));
  };

  const handlePageChange = (e) => {
    setCurrentpage(e);
    setPageNumber(e);
    member("All", e);
  };

  return (
    <Default>
      <Container>
        <Row as="ul" className="list-unstyled mb-0">
          {/* <Link href="/members/member-list" > */}

          <Col md="4" as="li">
            <Link
              href="members"
              onClick={(e) => {
                setPageStatus("All");
                setPageNumber(1);
                // member("All", 1, "");
              }}
            >
              <Card>
                <Card.Body>
                  <div className="text-center">
                    <div>
                      <i className="icon material-symbols-outlined">group</i>
                    </div>
                    <div>All Members</div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md="4" as="li">
            <Link
              href="members"
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
                    <div>Pending Members</div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md="4" as="li">
            <Link
              href="members"
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
                    <div>Approved Members List</div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md="4" as="li">
            <Link
              href="members"
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
                    <div>Decline Members List</div>
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
                {members && members?.docs &&
                  members?.docs?.length !== 0 &&
                  members?.docs?.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <th scope="row">{idx + 1}</th>
                        <td>{item.firstName}</td>
                        <td>{item.middleName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.userName}</td>
                        <td>{item.gender}</td>
                        <td>
                          {new Date(item.dateOfBirth).toLocaleDateString()}
                        </td>
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
                          {item.isAccountVerified ? (
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
            {members && members?.docs && members?.docs.length === 0 && (
              <div className="text-center w-100"> "No Record Found!"</div>
            )}
            {userData && (
              <>
                <ModalForEdit
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  apidata={userData && userData}
                />

                <ConfirmModal
                  show={modalConfirm}
                  onHide={() => setModalConfirm(false)}
                  apidata={userData && userData}
                />
              </>
            )}

            <div className="d-flex justify-content-center mt-5">
              {members && members?.totalDocs !== 0 && (
                <Pagination
                  activePage={currentpage}
                  itemClass="page-item"
                  linkClass="page-link"
                  itemsCountPerPage={countPerPage}
                  totalItemsCount={members?.totalDocs}
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
