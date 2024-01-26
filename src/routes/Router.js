import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../views/Dashboard.js";
import Users from "../views/Account.js";
// import Notification from "../views/ui/Notifications.js";
import StockListing from "../views/ui/Stock-listing.js";
import Transactions from "../views/ui/Transactions.js";
import System from "../views/ui/System.js";
import ReportAnalysis from "../views/ui/Reports-analysis.js";
import UserList from "../views/ui/Userlist.js";
import UserDetails from "../views/ui/Userdetails.js";
import UserRegistration from "../views/ui/User-mangement.js";
import AddStock from "../views/ui/AddStock.js";
// import EditStock from "../views/ui/EditStock.js";
import TransactionDetails from "../views/ui/TransactionsDetails.js";
import RefundCancellation from "../views/ui/RefundCancellation.js";
import AppSettings from "../views/ui/AppSetting.js";
import MyAccount from "../views/ui/MyAccount.js";
import EditProfile from "../views/ui/EditProfile.js";
import EditUser from "../views/ui/Role-management.js";
import AdminInbox from "../views/ui/AdminInbox.js";
import Logout from "../views/ui/Logout.js";
import PaymentMethods from "../views/ui/PaymentMethod.js";
import KYCUsers from "../views/ui/KYCUsers.js";
import UsersWithRoles from "../views/ui/UsersWithRoles.js";
import EmailTemplate from "../views/ui/EmailTemplate.js";
import SecuritySettings from "../views/ui/SecuritySettings.js";
import FinancialReport from "../views/ui/FinancialReport.js";
import UserActivityMonitoring from "../views/ui/UserActivityMonitoring.js";
import NotificationManagement from "../views/ui/NotificationManagement.js";
import WalletManagement from "../views/ui/WalletManagement.js";
import AdminLogin from "../views/ui/AdminLogin.js";
import EditRole from "../views/ui/EditRoles.js";
import CreateRole from "../views/ui/CreateRole.js";
import MarketMarkup from "../views/ui/MarketMarkup.js";
import AllBlog from "../views/ui/AllBlog.js";
import CreateBlog from "../views/ui/CreateBlog.js";
import GetAllEmailTemplates from "../views/ui/GetAllEmailTemplates.js";
import CreateEmailTemplate from "../views/ui/CreateEmailTemplate.js";
import ContactFormData from "../views/ui/ContactFormData.js";
import ReportSpamData from "../views/ui/ReportSpamData.js";
import SettlementAccountsTable from "../views/ui/SettlementAccountsTable.js";
import Sectors from "../views/ui/Sectors.js";
import TransactionPin from "../views/ui/TransactionPin.js";
import AddSectorForm from "../views/ui/AddSectorForm.js";
import GTNStock from "../views/ui/GTNStock.js";
import ExchangeRate from "../views/ui/ExchangeRate.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

// const Starter = lazy(() => import("../views/Dashboard.js"));
// const About = lazy(() => import("../views/User-management.js"));
// const Alerts = lazy(() => import("../views/ui/Notifications.js"));
// const Badges = lazy(() => import("../views/ui/Stock-listing.js"));
// const Buttons = lazy(() => import("../views/ui/Transactions.js"));
// const Cards = lazy(() => import("../views/ui/System.js"));
// const Grid = lazy(() => import("../views/ui/Role-management.js"));
// const Tables = lazy(() => import("../views/ui/Reports-analysis.js"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/user-management", exact: true, element: <Users /> },
      { path: "/notifications", exact: true, element: <NotificationManagement /> },
      { path: "/stocks-listing", exact: true, element: <StockListing /> },
      { path: "/transactions", exact: true, element: <Transactions /> },
      { path: "/systems-configuration", exact: true, element: <System /> },
      { path: "/role-management", exact: true, element: <EditUser /> },
      { path: "/report-analysis", exact: true, element: <ReportAnalysis /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/user-list", exact: true, element: <UserList /> },
      { path: "/role-details", exact: true, element: <UserDetails /> },
      { path: "/user-registration", exact: true, element: <UserRegistration /> },
      { path: "/add-stock", exact: true, element: <AddStock /> },
      // { path: "/edit-stock", exact: true, element: <EditStock /> },
      { path: "/transaction-details", exact: true, element: <TransactionDetails /> },
      { path: "/refund-cancellation", exact: true, element: <RefundCancellation /> },
      { path: "/app-settings", exact: true, element: <AppSettings /> },
      { path: "/my-account", exact: true, element: <MyAccount /> },
      { path: "/edit-profile", exact: true, element: <EditProfile /> },
      { path: "/inbox", exact: true, element: <AdminInbox /> },
      { path: "/logout", exact: true, element: <Logout /> },
      { path: "/payment-gateway", exact: true, element: <PaymentMethods /> },
      { path: "/kyc", exact: true, element: <KYCUsers /> },
      { path: "/role", exact: true, element: <UsersWithRoles /> },
      { path: "/email-templates", exact: true, element: <EmailTemplate /> },
      { path: "/security-settings", exact: true, element: <SecuritySettings /> },
      { path: "/financial-reports", exact: true, element: <FinancialReport /> },
      { path: "/user-activity", exact: true, element: <UserActivityMonitoring /> },
      { path: "/wallets", exact: true, element: <WalletManagement /> },
      { path: "/login", exact: true, element: <AdminLogin /> },
      { path: "/edit-role", exact: true, element: <EditRole /> },
      { path: "/create-role", exact: true, element: <CreateRole /> },
      { path: "/market-markup", exact: true, element: <MarketMarkup/> },
      { path: "/all-blogs", exact: true, element: <AllBlog/> },
      { path: "/create-blog", exact: true, element: <CreateBlog/> },
      { path: "/get-all-email-templates", exact: true, element: <GetAllEmailTemplates/> },
      { path: "/create-email-template", exact: true, element: <CreateEmailTemplate /> },
      { path: "/contact", exact: true, element: <ContactFormData/> },
      { path: "/report-scam", exact: true, element: <ReportSpamData /> },
      { path: "/all-settle", exact: true, element: <SettlementAccountsTable /> },
      { path: "/all-sector", exact: true, element: <Sectors /> },
      { path: "/transaction-reset", exact: true, element: <TransactionPin /> },
      { path: "/add-sectors", exact: true, element: <AddSectorForm /> },
      { path: "/all-gtnstocks", exact: true, element: <GTNStock /> },
      { path: "/exchange-rate", exact: true, element: <ExchangeRate /> },
    ],
  },
];

export default ThemeRoutes;
