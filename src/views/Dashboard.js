import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import StockListing from "./ui/Stock-listing";
import UserList from "./ui/Userlist";


const Dashboard = () => {
  return (
    <div>
      {/***Top Cards***/}

      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row>
      <Row>
        <Col lg="12">
        <UserList />
        </Col>
      </Row>
      <Row>
        <Col lg="12">
        <StockListing />
        </Col>
      </Row>
      {/* <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <StockListing />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <ReportAnalysis />
        </Col>
      </Row> */}
      {/***Table ***/}
      
      {/* <Row>
        <Col lg="12">
          <Users />
        </Col>
      </Row> */}
      {/***Blog Cards***/}
      {/* <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row> */}
    </div>
  );
};

export default Dashboard;
