import React, { useState } from "react";
import { Nav, NavItem, Collapse } from "reactstrap";
import { Link, useLocation } from "react-router-dom";


const Sidebar = () => {
  let location = useLocation();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [stockDropdownOpen, setStockDropdownOpen] = useState(false);
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [emailTemplateDropdownOpen, setEmailTemplateDropdownOpen] = useState(false);
  const [kycDropdownOpen, setKycDropdownOpen] = useState(false);

  // Function to toggle the Role Management dropdown
  const toggleRoleDropdown = () => {
    setRoleDropdownOpen(!roleDropdownOpen);
  };

  const toggleStockDropdown = () => {
    setStockDropdownOpen(!stockDropdownOpen);
  };

  const toggleHelpDropdown = () => {
    setHelpDropdownOpen(!helpDropdownOpen);
  };

  const toggleBlogDropdown = () => {
    setBlogDropdownOpen(!blogDropdownOpen);
  };

  const toggleEmailTemplateDropdown = () => {
    setEmailTemplateDropdownOpen(!emailTemplateDropdownOpen);
  };

  const toggleKycDropdown = () => {
    setKycDropdownOpen(!kycDropdownOpen);
  };

  return (
    <div className="bg-dark">
      <div className="mt-auto">
        <Nav vertical className="sidebarNav">
          <NavItem className="sidenav-bg">
            <Link
              to="/dashboard"
              className={
                location.pathname === "/dashboard-overview"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-speedometer2"></i>
              <span className="ms-3 d-inline-block">Dashboard Overview</span>
            </Link>
          </NavItem>    
          <NavItem className="sidenav-bg">
            <Link
              to="/user-list"
              className={
                location.pathname === "/user-list"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-people"></i>
              <span className="ms-3 d-inline-block">All Users</span>
            </Link>
          </NavItem>
          <NavItem className="sidenav-bg">
            <Link
              to="/user-registration"
              className={
                location.pathname === "/user-registration"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-person-plus"></i>
              <span className="ms-3 d-inline-block">Add User</span>
            </Link>
          </NavItem>

           {/* KYC Management Section */}
          <NavItem className="sidenav-bg">
            <Link
              to="#"
              onClick={toggleKycDropdown}
              className={
                location.pathname === "/kyc" || location.pathname === "/all-settle"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-pencil"></i>
              <span className="ms-3 d-inline-block">KYC Management</span>
              <i
                className={`bi ${
                  kycDropdownOpen ? "bi-caret-up" : "bi-caret-down"
                } ms-2 ms-auto`}
              ></i>
            </Link>

            {/* Collapse component for the KYC Management dropdown */}
            <Collapse isOpen={kycDropdownOpen}>
              <Nav vertical className="pl-4">
                <NavItem>
                  <Link
                    to="/kyc"
                    className={
                      location.pathname === "/kyc"
                        ? "active nav-link py-3"
                        : "nav-link py-3"
                    }
                  >
                    <span className="ms-3 d-inline-block">KYC</span>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/transaction-reset"
                    className={
                      location.pathname === "/transaction-reset"
                        ? "active nav-link py-3"
                        : "nav-link py-3"
                    }
                  >
                    <span className="ms-3 d-inline-block">Transaction Pin</span>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/all-settle"
                    className={
                      location.pathname === "/all-settle"
                        ? "active nav-link py-3"
                        : "nav-link py-3"
                    }
                  >
                    <span className="ms-3 d-inline-block">All Settlements accounts</span>
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </NavItem>

           {/* Email Template Dropdown */}
           <NavItem className="sidenav-bg">
            <Link
              to="#"
              onClick={toggleEmailTemplateDropdown}
              className={
                location.pathname === "/get-all-email-templates" ||
                location.pathname === "/create-email-template"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-envelope"></i>
              <span className="ms-3 d-inline-block">Email Template</span>
              <i
                className={`bi ${
                  emailTemplateDropdownOpen ? "bi-caret-up" : "bi-caret-down"
                } ms-2 ms-auto`}
              ></i>
            </Link>

            {/* Collapse component for the Email Template dropdown */}
            <Collapse isOpen={emailTemplateDropdownOpen}>
              <Nav vertical className="pl-4">
                <NavItem>
                  <Link
                    to="/get-all-email-templates"
                    className={
                      location.pathname === "/get-all-email-templates"
                        ? "active nav-link py-2"
                        : "nav-link py-2"
                    }
                  >
                    <span className="ms-3 d-inline-block">Get All Email Templates</span>
                  </Link>
                </NavItem>
                {/* <NavItem>
                  <Link
                    to="/create-email-template"
                    className={
                      location.pathname === "/create-email-template"
                        ? "active nav-link py-2"
                        : "nav-link py-2"
                    }
                  >
                    <span className="ms-3 d-inline-block">Create Email Template</span>
                  </Link>
                </NavItem> */}
              </Nav>
            </Collapse>
          </NavItem>

          <NavItem className="sidenav-bg">
            <Link
              to="/exchange-rate"
              className={
                location.pathname === "/exchange-rate"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-person-badge"></i>
              <span className="ms-3 d-inline-block">Exchange Rate</span>
            </Link>
          </NavItem>

          
          <NavItem className="sidenav-bg">
            <Link
              to="/wallets"
              className={
                location.pathname === "/wallets"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-person-badge"></i>
              <span className="ms-3 d-inline-block">Wallet Management</span>
            </Link>
          </NavItem>

          {/* Blog Management Dropdown */}
          <NavItem className="sidenav-bg">
            <Link
              to="#"
              onClick={toggleBlogDropdown}
              className={
                location.pathname === "/kyc" ||
                location.pathname === "/create-blog"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-pencil"></i>
              <span className="ms-3 d-inline-block">Blog Management</span>
              <i
                className={`bi ${
                  blogDropdownOpen ? "bi-caret-up" : "bi-caret-down"
                } ms-2 ms-auto`}
              ></i>
            </Link>

            {/* Collapse component for the Blog Management dropdown */}
            <Collapse isOpen={blogDropdownOpen}>
              <Nav vertical className="pl-4">
                <NavItem>
                  <Link
                    to="/all-blogs"
                    className={
                      location.pathname === "/all-blogs"
                        ? "active nav-link py-2"
                        : "nav-link py-2"
                    }
                  >
                    <span className="ms-3 d-inline-block">All Blogs</span>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/create-blog"
                    className={
                      location.pathname === "/create-blog"
                        ? "active nav-link py-2"
                        : "nav-link py-2"
                    }
                  >
                    <span className="ms-3 d-inline-block">Create Blog</span>
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </NavItem>

          <NavItem className="sidenav-bg">
              <Link
              to="#"
              onClick={toggleRoleDropdown}
              className={
                location.pathname === "/create-role" ||
                location.pathname === "/edit-role" ||
                location.pathname === "/user-details" ||
                location.pathname === "/role-list"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-file-earmark-plus"></i>
            <span className="ms-3 d-inline-block">Role Management</span>
            <i
              className={`bi ${
                roleDropdownOpen ? "bi-caret-up" : "bi-caret-down"
              } ms-2 ms-auto`}
            ></i>
            </Link>

            {/* Collapse component for the Role Management dropdown */}
            <Collapse isOpen={roleDropdownOpen}>
              <Nav vertical className="pl-4">
                <NavItem>
                  <Link
                    to="/create-role"
                    className={
                      location.pathname === "/create-role"
                        ? "active nav-link py-2"
                        : "nav-link py-2"
                    }
                  >
                    <span className="ms-3 d-inline-block">Create Role</span>
                  </Link>
                </NavItem>
                
                <NavItem>
                  <Link
                    to="/role-details"
                    className={
                      location.pathname === "/user-details"
                        ? "active nav-link py-2"
                        : "nav-link py-2"
                    }
                  >
                    <span className="ms-3 d-inline-block">All Roles</span>
                  </Link>
                </NavItem>
              
              </Nav>
            </Collapse>
          </NavItem>

           {/* Stock Management Dropdown */}
           <NavItem className="sidenav-bg">
            <Link
              to="#"
              onClick={toggleStockDropdown}
              className={
                location.pathname === "/edit-stock" ||
                location.pathname === "/add-stock" ||
                location.pathname === "/market-markup" ||
                location.pathname === "/edit-market-markup"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-box"></i>
              <span className="ms-3 d-inline-block">Stock Management</span>
              <i
                className={`bi ${
                  stockDropdownOpen ? "bi-caret-up" : "bi-caret-down"
                } ms-2 ms-auto`}
              ></i>
            </Link>

            {/* Collapse component for the Stock Management dropdown */}
            <Collapse isOpen={stockDropdownOpen}>
              <Nav vertical className="pl-4">
              <NavItem>
                  <Link
                    to="/all-gtnstocks"
                    className={
                      location.pathname === "/all-gtnstocks"
                        ? "active nav-link py-2"
                        : "nav-link py-2"
                    }
                  >
                    <span className="ms-3 d-inline-block">GTN Stock List</span>
                  </Link>
                </NavItem>
              <NavItem className="sidenav-bg">
                <Link
                  to="/stocks-listing"
                  className={
                    location.pathname === "/stock-list"
                      ? "active nav-link py-3"
                      : "nav-link py-3"
                  }
                >
                  {/* <i className="bi bi-patch-check"></i> */}
                  <span className="ms-3 d-inline-block">Stock List</span>
                </Link>
              </NavItem>
              <NavItem className="sidenav-bg">
                <Link
                  to="/feature-stock"
                  className={
                    location.pathname === "/feature-stock"
                      ? "active nav-link py-3"
                      : "nav-link py-3"
                  }
                >
                  {/* <i className="bi bi-patch-check"></i> */}
                  <span className="ms-3 d-inline-block">Feature Stocks</span>
                </Link>
              </NavItem>
              <NavItem className="sidenav-bg">
                <Link
                  to="/popular-stocks"
                  className={
                    location.pathname === "/popular-stocks"
                      ? "active nav-link py-3"
                      : "nav-link py-3"
                  }
                >
                  {/* <i className="bi bi-patch-check"></i> */}
                  <span className="ms-3 d-inline-block">Popular Stocks</span>
                </Link>
              </NavItem>
              <NavItem>
                  <Link
                    to="/add-sectors"
                    className={
                      location.pathname === "/add-sectors"
                        ? "active nav-link py-2"
                        : "nav-link py-2"
                    }
                  >
                    <span className="ms-3 d-inline-block">Add Sectors</span>
                  </Link>
                </NavItem>
              <NavItem className="sidenav-bg">
                <Link
                  to="/all-sector"
                  className={
                    location.pathname === "/all-sector"
                      ? "active nav-link py-3"
                      : "nav-link py-3"
                  }
                >
                  {/* <i className="bi bi-patch-check"></i> */}
                  <span className="ms-3 d-inline-block">Sectors</span>
                </Link>
              </NavItem>
                <NavItem>
                  <Link
                    to="/market-markup"
                    className={
                      location.pathname === "/market-markup"
                        ? "active nav-link py-2"
                        : "nav-link py-2"
                    }
                  >
                    <span className="ms-3 d-inline-block">Market Markup</span>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/add-stock"
                    className={
                      location.pathname === "/add-stock"
                        ? "active nav-link py-2"
                        : "nav-link py-2"
                    }
                  >
                    <span className="ms-3 d-inline-block">Add Stock</span>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/add-feature-stock"
                    className={
                      location.pathname === "/add-feature-stock"
                        ? "active nav-link py-2"
                        : "nav-link py-2"
                    }
                  >
                    <span className="ms-3 d-inline-block">Add Feature Stock</span>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/add-popular-stocks"
                    className={
                      location.pathname === "/add-popular-stocks"
                        ? "active nav-link py-2"
                        : "nav-link py-2"
                    }
                  >
                    <span className="ms-3 d-inline-block">Add Popular Stock</span>
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </NavItem>
          
          <NavItem className="sidenav-bg">
            <Link
              to="/transaction-details"
              className={
                location.pathname === "/transaction-details"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-file-earmark-text"></i>
              <span className="ms-3 d-inline-block">Transaction Details</span>
            </Link>
          </NavItem>

          {/* Help and Support Dropdown */}
          <NavItem className="sidenav-bg">
            <Link
              to="#"
              onClick={toggleHelpDropdown}
              className={
                helpDropdownOpen ? "active nav-link py-3" : "nav-link py-3"
              }
            >
              <i className="bi bi-question-circle"></i>
              <span className="ms-3 d-inline-block">Help and Support</span>
              <i
                className={`bi ${
                  helpDropdownOpen ? "bi-caret-up" : "bi-caret-down"
                } ms-2 ms-auto`}
              ></i>
            </Link>

            {/* Collapse component for the Help and Support dropdown */}
            <Collapse isOpen={helpDropdownOpen}>
              <Nav vertical className="pl-4">
                <NavItem>
                  <Link
                    to="/contact"
                    className={
                      location.pathname === "/contact"
                        ? "active nav-link py-2"
                        : "nav-link py-2"
                    }
                  >
                    <span className="ms-3 d-inline-block">Contact</span>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/report-scam"
                    className={
                      location.pathname === "/report-scam"
                        ? "active nav-link py-2"
                        : "nav-link py-2"
                    }
                  >
                    <span className="ms-3 d-inline-block">Report Scam</span>
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
