import React, { useEffect, useState } from "react";
import { Button, Card, Container, Dropdown, Form, Row } from "react-bootstrap";
import Default from "../../layouts/default";
import Sendinvitation from "../../components/modals/panel/Sendinvitation";
import { useDispatch, useSelector } from "react-redux";
import { getListOfRespectiveRoles } from "../../services/user.service";
import Pagination from "react-js-pagination";
import { SpinnerLoader } from "../../components/Loader/Loading";

const index = () => {
  const [show, setShow] = useState(false);

  const [list, setList] = useState([]);
  const userRole = useSelector(
    (state) => state?.user?.data?.userInfo?.roleInfo?.dropdownValue
  );

  const inviteData = {
    headers: ["#", "Email", "Status", "Action"],
  };
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentpage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const listOfAllRolesWithStatus = async () => {
    const response = await getListOfRespectiveRoles(
      selectedStatus,
      currentpage,
      limit
    );

    setList(response?.invitedMembers);
    setLoading(false);
    setTotalLength(response?.totalMemberCount);
    const noOfPage = Math.ceil(response?.totalMemberCount / limit);
    setPageRange(noOfPage);
  };

  useEffect(() => {
    setLoading(true);
    listOfAllRolesWithStatus();
  }, [currentpage, selectedStatus]);

  useEffect(() => {
    setCurrentPage(1);
    // setLoading(false)
  }, [selectedStatus]);

  return (
    <Default>
      <Sendinvitation show={show} onHide={() => setShow(false)} />
      <Container>
        <div id="content-page" className="content-page">
          <div className="container">
            <Row>
              <div className="col-sm-12">
                <Card className="inner-page-bg bg-primary p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="text-white">
                      {userRole === "System Admin"
                        ? "Invite Super Admin"
                        : "Invite Site Admin"}
                    </h3>
                    <Button variant="secondary" onClick={() => setShow(true)}>
                      Invite
                    </Button>
                  </div>
                </Card>
              </div>
            </Row>
            <Row>
              <Card>
                {loading ? (
                  <div
                    className="col-sm-12 d-flex justify-content-center align-items-center bg-transparent"
                    style={{ height: "500px" }}
                  >
                    <SpinnerLoader />
                  </div>
                ) : (
                  <>
                    <Card.Header className="d-flex   justify-content-between">
                      <div className="header-title d-flex justify-content-between w-100">
                        <h4 className="card-title">Invite List</h4>
                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Select
                            aria-label="Default select example"
                            className="shadow-none"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                          >
                            <option defaultChecked value="all">
                              All
                            </option>
                            <option value="accepted">Accepted</option>
                            <option value="pending">Pending</option>
                          </Form.Select>
                        </Form.Group>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                          <thead>
                            <tr>
                              {inviteData.headers.map((header, index) => (
                                <th key={index}>{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {list?.map((listItem, index) => (
                              <tr>
                                <th scope="row">
                                  <strong>
                                    {index + 1 + (currentpage - 1) * limit}
                                  </strong>
                                </th>
                                <td>{listItem.userName}</td>
                                <td>{listItem.status}</td>
                                <td>
                                  <span
                                    role="button"
                                    className="material-symbols-outlined mt-2"
                                  >
                                    forward_media
                                  </span>

                                  <span
                                    role="button"
                                    className="material-symbols-outlined mt-2"
                                  >
                                    delete
                                  </span>
                                </td>
                                <td>
                                  <span
                                    className="material-symbols-outlined"
                                    role="button"
                                  ></span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card.Body>
                  </>
                )}
                <div className="d-flex justify-content-center mt-5">
                  <Pagination
                    activePage={currentpage}
                    itemClass="page-item"
                    linkClass="page-link"
                    itemsCountPerPage={limit}
                    totalItemsCount={totalLength}
                    pageRangeDisplayed={pageRange}
                    onChange={(e) => {
                      setCurrentPage(e);
                    }}
                  />
                </div>
              </Card>
            </Row>
          </div>
        </div>
      </Container>
    </Default>
  );
};

export default index;
