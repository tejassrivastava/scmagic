import React from "react";
import { connect } from "react-redux";

import { userActions } from "../../../actions/user.actions";
import { history } from "../../../helpers/history";

import { persistor } from "../../../helpers/store";

class HomePage extends React.Component {
  constructor() {
    super();
    this.myInput = React.createRef();
  }

  buttonClickHandler = () => {
    this.setState({ tableSpinner: true });

    this.props.submitUserReq({
      index: 1,
      search: this.myInput.current.value,
    });
  };

  prevDisable = true;

  jobClickHandler = (d) => {
    this.props.singleJobClick(d);

    history.push({
      pathname: "/job",
    });
  };

  nextClickHandler = () => {
    this.props.submitUserReq({
      index: this.props.tabindexval + 1,
      search: this.myInput.current.value,
    });
  };

  prevClickHandler = () => {
    if (this.props.tabindexval === 1) {
    } else {
      this.props.submitPrevUserReq({
        index: this.props.tabindexval - 1,
        search: "code",
      });
    }
  };

  logoutClick = () => {
    persistor
      .purge()
      .then(() => {
        return persistor.flush();
      })
      .then(() => {
        persistor.pause();
        history.push("/login");
      });
  };
  render() {
    const { user, users } = this.props;
    return (
      <div className="container homecon">
        <div className="col-md-6 col-md-offset-3">
          <h1>Hi {user.firstName}!</h1>
          <p>You're logged in !!!</p>
          <p className="">
            <a
              href=""
              onClick={() => {
                this.logoutClick();
              }}
            >
              Logout
            </a>
          </p>
        </div>
        <div className="col-md-12">
          <h3>What programming language do you work on ?</h3>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your favourite programming language"
              aria-label="User Programming Language"
              aria-describedby="button-addon2"
              ref={this.myInput}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                id="button-addon2"
                onClick={() => {
                  this.buttonClickHandler();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        {this.props.tableSpinner && (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {this.props.tableVisible && (
          <div>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a
                    className="page-link"
                    style={{ cursor: "pointer" }}
                    tabIndex="-1"
                    aria-disabled="true"
                    onClick={() => {
                      this.prevClickHandler();
                    }}
                  >
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link">{this.props.tabindexval}</a>
                </li>
                <li className="page-item">
                  <a
                    style={{ cursor: "pointer" }}
                    className="page-link"
                    onClick={() => {
                      this.nextClickHandler();
                    }}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
            <div className="container table-responsive">
              <p>Click on the relevant job to view details</p>
              <table className="table table-hover table-borderless">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Company</th>
                    <th scope="col">Location</th>
                    <th scope="col">Title</th>
                    <th scope="col">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.jobs &&
                    this.props.jobs.map((d) => {
                      return (
                        <tr
                          style={{ cursor: "pointer" }}
                          key={d.id}
                          onClick={() => {
                            this.jobClickHandler(d);
                          }}
                        >
                          <td>{d.company}</td>
                          <td>{d.location}</td>
                          <td>{d.title}</td>
                          <td>{d.type}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    tabIndex="-1"
                    aria-disabled="true"
                    onClick={() => {
                      this.prevClickHandler();
                    }}
                  >
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link">{this.props.tabindexval}</a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => {
                      this.nextClickHandler();
                    }}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;

  return {
    user,
    users,
    jobs: state.users.jobs,
    tableVisible: state.users.tableVisible,
    tableSpinner: state.users.tableSpinner,
    tabindexval: state.users.tabindexval,
  };
}

const mapStateToProps = (state) => {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
};

const actionCreators = {
  submitUserReq: userActions.getAllJob,
  submitPrevUserReq: userActions.getPrevAllJob,
  singleJobClick: userActions.singleJobClick,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
