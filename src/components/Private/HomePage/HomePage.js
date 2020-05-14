import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../../../actions/user.actions";

class HomePage extends React.Component {
  componentDidMount() {
    
  }


  buttonClickHandler = () => {
      console.log("In buttonClickHandler");

      this.props.submitUserReq();

  }

  render() {
    const { user, users } = this.props;
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h1>Hi {user.firstName}!</h1>
          <p>You're logged in !!!</p>
          <p className="">
            <Link to="/login">Logout</Link>
          </p>
        </div>
        <div className="col-md-12">
          <h3>What programming language do you work on ?</h3>
          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your favourite programming language"
              aria-label="User Programming Language"
              aria-describedby="button-addon2"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-primary"
                type="button"
                id="button-addon2"
                onClick={()=>{this.buttonClickHandler()}}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const mapStateToProps = (state) => {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
};

const actionCreators = {

    submitUserReq: userActions.getAllJob
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
