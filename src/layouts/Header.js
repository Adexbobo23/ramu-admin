import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
// import Logo from "./Logo";
import { ReactComponent as LogoWhite } from "../assets/images/logos/black_logo.svg";
import user1 from "../assets/images/users/user4.jpg";
import white_logo from "../assets/images/white_logo.png"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };
  const showMobileMenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  return (
    <Navbar color="success" light expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          {/* <Logo /> */}
          <Link to="/dashboard" className="nav-link">
            <img src={white_logo} alt="Ramu Finance Logo" style={{ width: '150px', height: '50px' }} />
            {/* <h5><b>RAMU FINANCE</b></h5> */}
          </Link>
        </div>
        <NavbarBrand href="/">
          <LogoWhite className="d-lg-none" />
        </NavbarBrand>
        <Button
          color="transparent"
          className="d-lg-none"
          onClick={() => showMobileMenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="transparent"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={toggleMobileMenu}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/dashboard" className="nav-link">
            <span className="ms-3 d-inline-block text-white">Dashboard</span>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/stocks-listing" className="nav-link">
            <span className="ms-3 d-inline-block text-white">Stock Listings</span>
            </Link>
          </NavItem>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
            <span className="ms-3 d-inline-block text-white">Manage Users</span>
            </DropdownToggle>
            <DropdownMenu end>
              <Link to="user-list" className="nav-link">
                <DropdownItem>All User</DropdownItem>
              </Link>

              <Link to="user-registration" className="nav-link">
                <DropdownItem>Add User</DropdownItem>
              </Link>
              <DropdownItem divider />
              <Link to="/stocks-listing" className="nav-link">
                <DropdownItem>Stock Management</DropdownItem>
              </Link> 
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            {/* <DropdownItem header>Info</DropdownItem>
            <Link to="/my-account" className="nav-link">
              <DropdownItem>My Account</DropdownItem>
            </Link>

            <Link to="/edit-profile" className="nav-link">
              <DropdownItem>Edit Profile</DropdownItem>
            </Link>
            <DropdownItem divider /> */}
            {/* <Link to="/role-management" className="nav-link">
            <DropdownItem>Edit Role</DropdownItem>
            </Link> */}

            {/* <Link to="/inbox" className="nav-link">
            <DropdownItem>Inbox</DropdownItem>
            </Link> */}

            <Link to="/logout" className="nav-link">
            <DropdownItem>Logout</DropdownItem>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
