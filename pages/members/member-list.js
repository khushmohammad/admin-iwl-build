import React from "react";
import { Card, Col, Container, Pagination, Row } from "react-bootstrap";
import Default from "../../layouts/default";

function memberList() {
  return (
    <Default>
      <div>
        <Container>
          <Row>
            <Col sm="12">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Responsive tables</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Heading</th>
                          <th scope="col">Heading</th>
                          <th scope="col">Heading</th>
                          <th scope="col">Heading</th>
                          <th scope="col">Heading</th>
                          <th scope="col">Heading</th>
                          <th scope="col">Heading</th>
                          <th scope="col">Heading</th>
                          <th scope="col">Heading</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table4.map((item, idx) => (
                          <tr key={idx}>
                            <th scope="row">{item.row}</th>
                            <td>{item.heading1}</td>
                            <td>{item.heading2}</td>
                            <td>{item.heading3}</td>
                            <td>{item.heading4}</td>
                            <td>{item.heading5}</td>
                            <td>{item.heading6}</td>
                            <td>{item.heading7}</td>
                            <td>{item.heading8}</td>
                            <td>{item.heading9}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="text-center">
                      <Pagination className="justify-content-center">
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                      </Pagination>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Default>
  );
}

export default memberList;
