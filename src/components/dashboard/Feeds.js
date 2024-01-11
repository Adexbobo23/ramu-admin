import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";

const FeedData = [
  {
    title: "A new user just register",
    icon: "bi bi-bell",
    color: "primary",
    date: "6 minutes ago",
  },
  {
    title: "New user registered.",
    icon: "bi bi-person",
    color: "info",
    date: "6 minutes ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "danger",
    date: "6 minutes ago",
  },
  {
    title: "New order received.",
    icon: "bi bi-bag-check",
    color: "success",
    date: "6 minutes ago",
  },
  {
    title: "New Stock added",
    icon: "bi bi-bell",
    color: "dark",
    date: "6 minutes ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "warning",
    date: "6 minutes ago",
  },
];

const Feeds = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Notification Feed</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Admin check this out
        </CardSubtitle>
        {/* Wrap ListGroup in a div with a specific height and overflow-y:auto */}
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          <ListGroup flush className="mt-4">
            {FeedData.map((feed, index) => (
              <ListGroupItem
                key={index}
                action
                href="/"
                tag="a"
                className="d-flex align-items-center p-3 border-0"
              >
                <Button
                  className="rounded-circle me-3"
                  size="sm"
                  color={feed.color}
                >
                  <i className={feed.icon}></i>
                </Button>
                {feed.title}
                <small className="ms-auto text-muted text-small">
                  {feed.date}
                </small>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </CardBody>
    </Card>
  );
};

export default Feeds;
