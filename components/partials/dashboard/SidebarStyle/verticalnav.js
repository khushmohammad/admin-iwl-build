import React, { useState, useContext, useEffect } from "react";
import { getAllCategoryData } from "../../../../services/resource.service";

//react-bootstrap
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
  Nav,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

//router
import { useRouter } from "next/router";
import Link from "next/link";

function CustomToggle({ children, eventKey, onClick }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, (active) =>
    onClick({ state: !active, eventKey: eventKey })
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Link
      href="#"
      aria-expanded={isCurrentEventKey ? "true" : "false"}
      className="nav-link"
      role="button"
      onClick={(e) => {
        decoratedOnClick(isCurrentEventKey);
      }}
    >
      {children}
    </Link>
  );
}

const VerticalNav = React.memo(() => {
  const [categoryList, setCategoryInsert] = useState(null);
  const [activeMenu, setActiveMenu] = useState(false);
  const [active, setActive] = useState("");
  //location
  let location = useRouter();
  // console.log(document);
  const getallCtegory = async () => {
    const data = await getAllCategoryData();
    setCategoryInsert(data);
  };

  useEffect(() => {
    getallCtegory();
  }, []);

  const getCategoryList = () => {
    getallCtegory();
  };

  return (
    <React.Fragment>
      <Accordion as="ul" className="navbar-nav iq-main-menu" id="sidebar-menu">
        <li className="nav-item static-item">
          <Link
            className="nav-link static-item disabled"
            href="#"
            tabIndex="-1"
          >
            <span className="default-icon">Admin Dashboard</span>
            <span
              className="mini-icon"
              data-bs-toggle="tooltip"
              title="Social"
              data-bs-placement="right"
            >
              -
            </span>
          </Link>
        </li>
        <li
          className={`${location.pathname === "/" ? "active" : ""} nav-item `}
        >
          <Link
            className={`${location.pathname === "/" ? "active" : ""} nav-link `}
            aria-current="page"
            href="/"
          >
            <OverlayTrigger placement="right" overlay={<Tooltip>Home</Tooltip>}>
              <i className="icon material-symbols-outlined">
                admin_panel_settings
              </i>
            </OverlayTrigger>
            <span className="item-name">Home</span>
          </Link>
        </li>
        <Nav.Item as="li">
          <Link
            className={`${
              location.pathname === "/members" ? "active" : ""
            } nav-link `}
            aria-current="page"
            href="/members"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Members</Tooltip>}
            >
              <i className="icon material-symbols-outlined">group</i>
            </OverlayTrigger>
            <span className="item-name">Members</span>
          </Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link
            className={`${
              location.pathname === "/ic" ? "active" : ""
            } nav-link `}
            aria-current="page"
            href="/ic"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Integrating Coach</Tooltip>}
            >
              <i className="icon material-symbols-outlined">support_agent</i>
            </OverlayTrigger>
            <span className="item-name">Integrating Coach</span>
          </Link>
        </Nav.Item>

        <Accordion.Item as="li" eventKey="group-menu" bsPrefix="nav-item">
          <CustomToggle
            eventKey="group-menu"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Groups</Tooltip>}
            >
              <i className="icon material-symbols-outlined">groups</i>
            </OverlayTrigger>
            <span className="item-name">Groups</span>
            <i className="right-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="group-menu">
            <ul className="sub-nav">
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/all-groups" ? "active" : ""
                  } nav-link`}
                  href="/groups/all-groups"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>All Groups</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> AG </i>
                  </OverlayTrigger>
                  <span className="item-name">All Groups</span>
                </Link>
              </Nav.Item>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>

        <Nav.Item as="li">
          <Link
            className={`${
              location.pathname === "/help" ? "active" : ""
            } nav-link `}
            aria-current="page"
            href="/help"
          >
            <OverlayTrigger placement="right" overlay={<Tooltip>Help</Tooltip>}>
              <i className="icon material-symbols-outlined">help</i>
            </OverlayTrigger>
            <span className="item-name">Help</span>
          </Link>
        </Nav.Item>

        <Accordion.Item
          as="li"
          eventKey="friends-menu"
          bsPrefix="nav-item"
          onClick={(e) => getCategoryList()}
        >
          <CustomToggle
            eventKey="friends-menu"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Resource</Tooltip>}
            >
              <i className="icon material-symbols-outlined"> build_circle</i>
            </OverlayTrigger>
            <span className="item-name">Resource</span>
          </CustomToggle>
          <Accordion.Collapse eventKey="friends-menu">
            <ul className="sub-nav">
              <Nav.Item as="li">
                <Link
                  className={`${
                    location.pathname === "/resources" ? "active" : ""
                  } nav-link `}
                  aria-current="page"
                  href="/resources"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>New Category</Tooltip>}
                  >
                    <i className="sidenav-mini-icon"> FF </i>
                  </OverlayTrigger>
                  <span className="item-name">New Category</span>
                </Link>
              </Nav.Item>
              {/* {categoryList?.map((item, index) => (
                <React.Fragment key={index}>
                  <Nav.Item as="li">
                    <Link className="nav-link" aria-current="page" href="">
                      <i className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <g>
                            <circle
                              cx="12"
                              cy="12"
                              r="8"
                              fill="currentColor"
                            ></circle>
                          </g>
                        </svg>
                      </i>
                      <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip>{item.name}</Tooltip>}
                      >
                        <i className="sidenav-mini-icon"> FF </i>
                      </OverlayTrigger>
                      <span className="item-name">{item.name}</span>
                    </Link>
                  </Nav.Item>
                </React.Fragment>
              ))} */}
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>
        <Nav.Item as="li">
          <Link
            className={`${
              location.pathname === "/subscription" ? "active" : ""
            } nav-link `}
            aria-current="page"
            href="/subscription"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Subscription</Tooltip>}
            >
              <i className="icon material-symbols-outlined">help</i>
            </OverlayTrigger>
            <span className="item-name">Subscription</span>
          </Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link
            className={`${
              location.pathname === "/report" ? "active" : ""
            } nav-link `}
            aria-current="page"
            href="/report"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Reports</Tooltip>}
            >
              <i className="icon material-symbols-outlined">flag</i>
            </OverlayTrigger>
            <span className="item-name">Reports</span>
          </Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link
            className={`${
              location.pathname === "/notificationSetting" ? "active" : ""
            } nav-link `}
            aria-current="page"
            href="/notificationSetting"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Notification Setting</Tooltip>}
            >
              <i className="icon material-symbols-outlined">notifications</i>
            </OverlayTrigger>
            <span className="item-name">Notification Setting</span>
          </Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link
            className={`${
              location.pathname === "/activitylogs" ? "active" : ""
            } nav-link `}
            aria-current="page"
            href="/activitylogs"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Activity Logs</Tooltip>}
            >
              <i className="icon material-symbols-outlined">pace</i>
            </OverlayTrigger>
            <span className="item-name">Activity Logs</span>
          </Link>
        </Nav.Item>

        <Nav.Item as="li">
          <Link
            className={`${
              location.pathname === "/siteadmin" ? "active" : ""
            } nav-link `}
            aria-current="page"
            href="/siteadmin"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Invitation</Tooltip>}
            >
              <i className="icon material-symbols-outlined">person_add</i>
            </OverlayTrigger>
            <span className="item-name">Invitation</span>
          </Link>
        </Nav.Item>
      </Accordion>
    </React.Fragment>
  );
});

export default VerticalNav;
