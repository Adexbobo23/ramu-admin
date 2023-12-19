import React, { useState } from "react";
import { Nav, NavItem, Collapse } from "reactstrap";
import { Link, useLocation } from "react-router-dom";


const Sidebar = () => {
  let location = useLocation();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [stockDropdownOpen, setStockDropdownOpen] = useState(false);

  // Function to toggle the Role Management dropdown
  const toggleRoleDropdown = () => {
    setRoleDropdownOpen(!roleDropdownOpen);
  };

  const toggleStockDropdown = () => {
    setStockDropdownOpen(!stockDropdownOpen);
  };


  return (
    <div className="bg-dark">
      {/* <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div> */}
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
              to="/kyc"
              className={
                location.pathname === "/kyc-requirements"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-person-badge"></i>
              <span className="ms-3 d-inline-block">KYC</span>
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
      
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
