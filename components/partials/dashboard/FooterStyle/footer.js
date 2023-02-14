import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
// import { Link} from 'react-router-dom'
import { Row, Col, Container } from "react-bootstrap";

const Footer = (props) => {
  return (
    <>
      <footer className="iq-footer bg-white">
        <Container fluid>
          <Row>
            <Col lg="6">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <Link href="/dashboard/extrapages/privacy-policy">
                    Privacy Policy
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link href="/dashboard/extrapages/terms-of-service">
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </Col>
            <Col lg="6" className="d-flex justify-content-end">
              <span>
                Copyright 2020<Link href="/"> IWL </Link> All Rights
                Reserved.
              </span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
