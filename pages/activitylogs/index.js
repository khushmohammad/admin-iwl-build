import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Default from "../../layouts/default";
import Pagination from "react-js-pagination";

//image
import user1 from "../../public/assets/images/user/25.png";
import {
  getAllActivities,
  searchUserByNameService,
} from "../../services/activitylog.service";

function ActivityLog() {
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [limit, setLimit] = useState(10);
  const [currentpage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [filterData, setFilterData] = useState({
    from: null,
    to: null,
  });

  const handleUserClick = (id) => {
    setFilterData({ ...filterData, userIds: [id] });
  };

  const getUserList = async () => {
    const data = await searchUserByNameService(searchText);
    setUsers(data);
  };

  const getActivityLogs = async (pageNo) => {
    try {
      const data = await getAllActivities(pageNo, limit, filterData);

      const { docs, totalDocs } = data;
      setActivities(docs);
      setLimit(limit);
      const noOfPage = Math.floor(totalDocs / limit);

      setTotalLength(totalDocs);
      setPageRange(noOfPage);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (searchText) getUserList();
  }, [searchText]);

  useEffect(() => {
    getActivityLogs();
  }, []);

  useEffect(() => {
    if (filterData.from && filterData.to) {
      getActivityLogs();
    }
    if (filterData?.userIds && filterData?.userIds !== 0) {
      getActivityLogs();
    }
  }, [filterData]);

  return (
    <Default>
      <Container>
        <div id="content-page" className="content-page">
          <div className="container">
            <Row>
              <div className="col-sm-12">
                <Card className="inner-page-bg bg-primary p-4">
                  <div className="d-flex justify-content-between align-align-items-center">
                    <h3 className="text-white">Activity Logs</h3>
                  </div>
                </Card>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12 w-100 mb-4">
                <Row className="align-items-center">
                  <div className="position-relative col-4">
                    <Form onClick={() => setShow((prev) => !prev)}>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search by user..."
                          defaultValue={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                      </div>

                      {show && users && users.length > 0 ? (
                        <Card
                          className="w-100 top-2 overflow-auto position-absolute shadow p-3 mb-5 bg-white rounded"
                          style={{
                            zIndex: 11,
                            maxHeight: "500px",
                            minHeight: 0,
                          }}
                        >
                          <Card.Body>
                            <ul className="request-list list-inline m-0 p-0">
                              {users &&
                                users.length > 0 &&
                                users.map((user, index) => (
                                  <li
                                    key={index}
                                    onClick={() => handleUserClick(user?._id)}
                                    role="button"
                                    className="d-flex align-align-items-center justify-content-between flex-wrap"
                                  >
                                    <div className="user-img img-fluid flex-shrink-0">
                                      <Image
                                        src={
                                          user?.profileImage?.file?.location ||
                                          user1
                                        }
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                        height={100}
                                        width={100}
                                      />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                      <h6 className="text-capitalize">
                                        {user.fullName}
                                      </h6>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </Card.Body>
                        </Card>
                      ) : null}
                    </Form>
                  </div>
                  <div className="col-8 d-flex">
                    <Row>
                      <div className="col-5 d-flex align-items-center">
                        <Form.Label className="m-0">From Date: </Form.Label>
                        <Form.Control
                          type="date"
                          name="from"
                          value={filterData.from || ""}
                          onChange={(e) =>
                            setFilterData({
                              ...filterData,
                              from: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-5 d-flex align-items-center">
                        <Form.Label className="m-0">To Date: </Form.Label>
                        <Form.Control
                          type="date"
                          name="to"
                          value={filterData.to || ""}
                          onChange={(e) =>
                            setFilterData({
                              ...filterData,
                              to: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-1">
                        <Button
                          onClick={() =>
                            setFilterData({ from: null, to: null })
                          }
                        >
                          Reset
                        </Button>
                      </div>
                    </Row>
                  </div>
                </Row>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 w-100">
                {activities &&
                  activities.length > 0 &&
                  activities.map((log, index) => (
                    <Card key={index}>
                      <Card.Body className="border rounded d-flex align-items-center">
                        <Image
                          src={log?.profilePicture?.file?.location || user1}
                          alt="story-img"
                          className="rounded-circle avatar-40"
                          height={100}
                          width={100}
                        />
                        <div
                          className="list-unstyled text-start line-height-4 mb-0 mx-2"
                          dangerouslySetInnerHTML={{
                            __html: log.message,
                          }}
                        ></div>
                      </Card.Body>
                    </Card>
                  ))}
              </div>
            </Row>
          </div>
          {activities && activities.length === 0 && (
            <Card>
              <Card.Body>No Records founds!</Card.Body>
            </Card>
          )}
          <div className="d-flex justify-content-center mt-5">
            {activities && activities.length > 1 && (
              <Pagination
                activePage={currentpage}
                itemClass="page-item"
                linkClass="page-link"
                itemsCountPerPage={limit}
                totalItemsCount={totalLength}
                pageRangeDisplayed={pageRange}
                onChange={(e) => {
                  setCurrentPage(e);
                  getActivityLogs(e);
                }}
              />
            )}
          </div>
        </div>
      </Container>
    </Default>
  );
}

export default ActivityLog;
