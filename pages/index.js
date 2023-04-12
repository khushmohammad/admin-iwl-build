import React, { useState, useEffect } from "react";

// react-boostrap
import { Container, Col, Row, Dropdown, ProgressBar } from "react-bootstrap";

// components
import Card from "../components/Card";
import CustomToggle from "../components/dropdowns";
import Default from "../layouts/default";

// Datepicker
// import Datepicker from '../components/datepicker'

import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";

// apex-chart
// import Charts from "react-apexcharts";

import { ApexCharts } from "../components/charts/ApexCharts";
import { systemHealth } from "../services/systemhealth.service";

const Admin = () => {
  const [servicesArr, setServicesArr] = useState([]);
  const [runningPercent, setRunningPercent] = useState(0);
  const [stoppedPercent, setStoppedPercent] = useState(0);

  const systemStatus = async () => {
    try {
      const res = await systemHealth();
      console.log("<<<--->>>", res);
      setServicesArr(res.serviceStatus);
      setRunningPercent(res.runningServicesPercentage);
      setStoppedPercent(100 - res.runningServicesPercentage);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    systemStatus();
    setInterval(() => {
      systemStatus();
      console.log("hello world!");
    }, 60000);
  }, []);

  const adminChart = {
    options: {
      colors: ["#50b5ff"],
      chart: {
        toolbar: {
          show: false,
        },
      },
      forecastDataPoints: {
        count: 2,
      },
      stroke: {
        width: 3,
      },
      grid: {
        show: true,
        strokeDashArray: 7,
      },
      markers: {
        size: 6,
        colors: "#FFFFFF",
        strokeColors: ["#50b5ff"],
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 0,
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "Total Account",
        data: [42, 30, 25, 40, 57, 71, 86, 71, 108],
      },
    ],
  };

  const adminChart1 = {
    options: {
      colors: ["#50b5ff", "#d592ff"],
      plotOptions: {
        radialBar: {
          inverseOrder: false,
          endAngle: 360,
          hollow: {
            margin: 5,
            size: "50%",
            background: "transparent",
            imageWidth: 150,
            imageHeight: 150,
            imageClipped: true,
            position: "front",
            dropShadow: {
              enabled: false,
              blur: 3,
              opacity: 0.5,
            },
          },
          track: {
            show: true,
            background: "#f2f2f2",
            strokeWidth: "70%",
            opacity: 1,
            margin: 6,
            dropShadow: {
              enabled: false,
              blur: 3,
              opacity: 0.5,
            },
          },
          dataLabels: {
            show: true,
            name: {
              show: true,
              fontSize: "16px",
              fontWeight: 600,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "14px",
              fontWeight: 400,
              offsetY: 16,
              formatter: function(val) {
                return val + "%";
              },
            },
          },
        },
      },
      labels: ["Male", "Female"],
    },
    series: [74, 60],
  };

  const adminChart2 = {
    options: {
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
      },
      labels: ["Likes", "Followers"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
    },
    series: [65, 35],
  };

  return (
    <>
      <Default>
        <Container>
          <Row as="ul" className="list-unstyled mb-0">
            <Col md="6" lg="3" as="li">
              <Card>
                <Card.Body>
                  <div className="points">
                    <span>Last Month Posts</span>
                    <div className="d-flex align-items-center">
                      <h3>1,032</h3>
                      <small className="text-success ms-3">+ 57</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md="6" lg="3" as="li">
              <Card>
                <Card.Body>
                  <div className="points">
                    <span>Last Month Followers</span>
                    <div className="d-flex align-items-center">
                      <h3>4,50,623</h3>
                      <small className="text-danger ms-3">- 12,562</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md="6" lg="3" as="li">
              <Card>
                <Card.Body>
                  <div className="points">
                    <span>Last Months Posts Liked</span>
                    <div className="d-flex align-items-center">
                      <h3>16,502</h3>
                      <small className="text-success ms-3">+ 1,056</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md="6" lg="3" as="li">
              <Card>
                <Card.Body>
                  <div className="points">
                    <span>Last Month Comments</span>
                    <div className="d-flex align-items-center">
                      <h3>3,90,822</h3>
                      <small className="text-success ms-3">+ 28,476</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="8">
              <Card className="card-block card-stretch card-height">
                <Card.Header>
                  <h4 className="card-title">New Accounts</h4>
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} variant="text-secondary">
                      This year
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-end">
                      <li>
                        <Dropdown.Item href="#">Year</Dropdown.Item>
                      </li>
                      <li>
                        <Dropdown.Item href="#">Month</Dropdown.Item>
                      </li>
                      <li>
                        <Dropdown.Item href="#">Week</Dropdown.Item>
                      </li>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Header>
                <Card.Body>
                  <ApexCharts
                    options={adminChart.options}
                    series={adminChart.series}
                    type="line"
                    height="198"
                    width={"100%"}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col lg="4">
              <Card>
                <Card.Header>
                  <div className="header-title">
                    <h4 className="card-title">Customer Gender</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <row>
                    <Col md="6" lg="6" className="d-grid gap gap-3">
                      <div className="d-flex align-items-start">
                        <i className="icon material-symbols-outlined filled text-primary mt-1">
                          fiber_manual_record
                        </i>
                        <div className="ms-2" style={{ lineHeight: "1.5" }}>
                          <span className="mb-3">Male Customer</span>
                          <h6 className="mb-0">74%</h6>
                        </div>
                      </div>
                      <div className="d-flex align-items-start">
                        <i className="icon material-symbols-outlined filled text-info mt-1">
                          fiber_manual_record
                        </i>
                        <div className="ms-2" style={{ lineHeight: "1.5" }}>
                          <span className="mb-3">Female Customer</span>
                          <h6 className="mb-0">60%</h6>
                        </div>
                      </div>
                    </Col>
                    <ApexCharts
                      options={adminChart1.options}
                      className="col-md-8 col-lg-8"
                      series={adminChart1.series}
                      height="200"
                      type="radialBar"
                      width={"100%"}
                    />
                    {/* <div
                      id="admin-chart-03"
                      className="col-md-8 col-lg-8 admin-chart-03"
                    ></div> */}
                  </row>
                </Card.Body>
              </Card>
            </Col>

            <Col lg="4" md="6">
              <Card>
                <Card.Header>
                  <div className="header-title">
                    <h4 className="card-title">Calendar</h4>
                  </div>
                </Card.Header>
                <Card.Body className="text-center">
                  <div className="input-group d-block">
                    <Calender />
                    {/* <Datepicker className="vanila-datepicker" /> */}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="4" md="6">
              <Card>
                <Card.Header>
                  <div className="header-title">
                    <h4 className="card-title">Categories</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mt-2 text-dark">
                      <h6>Video hosting</h6>
                      <small>62%</small>
                    </div>
                    <ProgressBar
                      variant="danger"
                      className="mt-2"
                      now={62}
                      style={{ height: "6px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mt-2 text-dark">
                      <h6>Image sharing</h6>
                      <small>46%</small>
                    </div>
                    <ProgressBar
                      variant="info"
                      className="mt-2"
                      now={46}
                      style={{ height: "6px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mt-2 text-dark">
                      <h6>Community blogs</h6>
                      <small>79%</small>
                    </div>
                    <ProgressBar
                      variant="primary"
                      className="mt-2"
                      now={79}
                      style={{ height: "6px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mt-2 text-dark">
                      <h6>Stories</h6>
                      <small>34%</small>
                    </div>
                    <ProgressBar
                      variant="success"
                      className="mt-2"
                      now={34}
                      style={{ height: "6px" }}
                    />
                  </div>
                  <div className="">
                    <div className="d-flex justify-content-between mt-2 text-dark">
                      <h6>Bookmarking</h6>
                      <small>95%</small>
                    </div>
                    <ProgressBar
                      variant="warning"
                      className="mt-2"
                      now={95}
                      style={{ height: "6px" }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="4">
              <Card>
                <Card.Header>
                  <div className="header-title">
                    <h4 className="card-title">Posts History</h4>
                  </div>
                </Card.Header>
                <Card.Body className="text-center">
                  {/* <ApexCharts
                    options={adminChart2.options}
                    className="col-md-8 col-lg-8"
                    series={adminChart2.series}
                    width={290}
                    type="pie"
                  /> */}
                  <p className="mb-0 mt-3">
                    58% of friends that visit your profile comment on your
                    posts.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="8">
              <Card>
                <Card.Header>
                  <div className="header-title">
                    <h4 className="card-title">Services Running</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row>
                    {servicesArr.length > 0 &&
                      servicesArr.map((elem) => {
                        if (elem.success === true) {
                          return (
                            <Col md="6" lg="6" className="d-grid gap gap-3">
                              <div>
                                <div className="ms-2 d-flex">
                                  <span>
                                    <i
                                      className="icon material-symbols-outlined filled "
                                      style={{
                                        color: "green",
                                        fontSize: "28px",
                                      }}
                                    >
                                      fiber_manual_record
                                    </i>
                                  </span>
                                  <span className="">
                                    {elem.message.split(" ")[0]} Service
                                  </span>
                                </div>
                              </div>
                            </Col>
                          );
                        } else if (elem.success === false) {
                          return (
                            <Col md="6" lg="6" className="d-grid gap gap-3">
                              <div>
                                <div className="ms-2 d-flex">
                                  <span>
                                    <i
                                      className="icon material-symbols-outlined filled "
                                      style={{
                                        color: "red",
                                        fontSize: "28px",
                                      }}
                                    >
                                      fiber_manual_record
                                    </i>
                                  </span>
                                  <span className="">
                                    {elem.message.split(" ")[0]} Service
                                  </span>
                                </div>
                              </div>
                            </Col>
                          );
                        }
                      })}

                    {/* <div
                      id="admin-chart-03"
                      className="col-md-8 col-lg-8 admin-chart-03"
                    ></div> */}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Default>
    </>
  );
};

export default Admin;
