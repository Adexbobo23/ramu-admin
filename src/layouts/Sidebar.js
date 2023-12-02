import { Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Nav, NavItem, Dropdown } from 'react-bootstrap';

// const navigation = [
//   {
//     title: "Dashboard",
//     href: "/dashboard",
//     icon: "bi bi-speedometer2",
//   },
//   {
//     title: "Notifications",
//     href: "/notifications",
//     icon: "bi bi-bell",
//   },
//   {
//     title: "Stock Listings",
//     href: "/stocks-listing",
//     icon: "bi bi-patch-check",
//   },
//   {
//     title: "Transactions",
//     href: "/transactions",
//     icon: "bi bi-hdd-stack",
//   },
//   {
//     title: "System",
//     href: "/systems-configuration",
//     icon: "bi bi-card-text",
//   },
//   {
//     title: "Role Management",
//     href: "/role-management",
//     icon: "bi bi-columns",
//   },
//   {
//     title: "Reporting",
//     href: "/report-analysis",
//     icon: "bi bi-layout-split",
//   },
//   {
//     title: "User Management",
//     href: "/user-management",
//     icon: "bi bi-people",
//   },
// ];

const Sidebar = () => {
  let location = useLocation();

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
              to="/create-role"
              className={
                location.pathname === "/create-role"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-person-plus"></i>
              <span className="ms-3 d-inline-block">Create Role</span>
            </Link>
          </NavItem>
          
          <NavItem className="sidenav-bg">
            <Link
              to="/role"
              className={
                location.pathname === "/role-list"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-columns"></i>
              <span className="ms-3 d-inline-block">Role List</span>
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
              to="/role-details"
              className={
                location.pathname === "/user-details"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-person"></i>
              <span className="ms-3 d-inline-block">All Roles</span>
            </Link>
          </NavItem>

          <NavItem className="sidenav-bg">
            <Link
              to="/edit-role"
              className={
                location.pathname === "/edit-role"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-pencil"></i>
              <span className="ms-3 d-inline-block">Edit Role</span>
            </Link>
          </NavItem>
          
          <NavItem className="sidenav-bg">
            <Link
              to="/role-management"
              className={
                location.pathname === "/create-role"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-file-earmark-plus"></i>
              <span className="ms-3 d-inline-block">Role Management</span>
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
              <i className="bi bi-patch-check"></i>
              <span className="ms-3 d-inline-block">Stock List</span>
            </Link>
          </NavItem>
          {/* <NavItem className="sidenav-bg">
            <Link
              to="/transactions"
              className={
                location.pathname === "/transaction-list"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-hdd-stack"></i>
              <span className="ms-3 d-inline-block">Transaction List</span>
            </Link>
          </NavItem> */}
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
          {/* <NavItem className="sidenav-bg">
            <Link
              to="/app-settings"
              className={
                location.pathname === "/app-settings"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-gear"></i>
              <span className="ms-3 d-inline-block">App Settings</span>
            </Link>
          </NavItem> */}
          <NavItem className="sidenav-bg">
            <Link
              to="/email-templates"
              className={
                location.pathname === "/email-templates"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-envelope"></i>
              <span className="ms-3 d-inline-block">Email Templates</span>
            </Link>
          </NavItem>
          
          {/* <NavItem className="sidenav-bg">
            <Link
              to="/security-settings"
              className={
                location.pathname === "/security-settings"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-shield-lock"></i>
              <span className="ms-3 d-inline-block">Security Settings</span>
            </Link>
          </NavItem> */}
          
    
          {/* <NavItem className="sidenav-bg">
            <Link
              to="/financial-reports"
              className={
                location.pathname === "/financial-reports"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-file-earmark-bar-graph"></i>
              <span className="ms-3 d-inline-block">Financial Reports</span>
            </Link>
          </NavItem> */}
          <NavItem className="sidenav-bg">
            <Link
              to="/user-activity"
              className={
                location.pathname === "/user-activity"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-journal-check"></i>
              <span className="ms-3 d-inline-block">User Activity Monitoring</span>
            </Link>
          </NavItem>
          {/* <NavItem className="sidenav-bg">
            <Link
              to="/notifications"
              className={
                location.pathname === "/system-notifications"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-bell"></i>
              <span className="ms-3 d-inline-block">System Notifications</span>
            </Link>
          </NavItem> */}
          {/* <NavItem className="sidenav-bg">
            <Link
              to="/security-alerts"
              className={
                location.pathname === "/security-alerts"
                  ? "active nav-link py-3"
                  : "nav-link py-3"
              }
            >
              <i className="bi bi-exclamation-circle"></i>
              <span className="ms-3 d-inline-block">Security Alerts</span>
            </Link>
          </NavItem> */}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
