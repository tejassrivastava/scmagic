import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

class SuccessPage extends React.Component {
  render() {
    const { data } = this.props.location;
    return (
      <div className="container succcon">
        <Jumbotron fluid className="jumb">
          <h1>Application Successfully Submited</h1>
          <p>
            You applied as {data.title} at {data.company} in {data.location}.
          </p>
        </Jumbotron>
      </div>
    );
  }
}
const spage = SuccessPage;
export { spage as SuccessPage };
