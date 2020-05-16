import React from "react";
import { connect } from "react-redux";

import { userActions } from "../../../actions/user.actions";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { history } from "../../../helpers/history";
import { Form, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

class JobPage extends React.Component {
  constructor() {
    super();

    this.state = {
      modalShow: false,
      validated: false,
      job: {},
    };
  }

  setModalShow = (val) => {
    this.setState({ modalShow: val });
  };

  handleSubmit = (event, data) => {
    const form = event.currentTarget;

    let finalData = {
      name: form.elements.vcname.value,
      email: form.elements.vcemail.value,
      cover: form.elements.vccover.value,
      file: form.elements.cfile.value,
      location: data.location,
      title: data.title,
      company: data.company,
    };

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      history.push({
        pathname: "/success",
        data: finalData,
      });
    }

    this.setState({ validated: true });
  };

  render() {
    const data = this.props.job;

    window.scrollTo(0, 0);
    return (
      <div className="container jobContainer">
        <Link to="/">Back</Link>
        <div class="card">
          <div class="card-header">
            {data.title}

            <small>{data.company}</small>
            <img className="col-md-1" src={data.company_logo}></img>
            <small className="float-right">{data.created_at}</small>
          </div>
          <div class="card-body">
            <h5 class="card-title">Job Description</h5>
            <p
              class="card-text"
              dangerouslySetInnerHTML={{ __html: data.description }}
            ></p>
            <h6>Job Type: {data.type}</h6>
            <h6>Job Location: {data.location}</h6>

            <a onClick={() => this.setModalShow(true)} class="btn btn-primary">
              Apply
            </a>
          </div>
        </div>

        <Modal
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Apply to the Job
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={(event) => {
                this.handleSubmit(event, {
                  location: data.location,
                  title: data.title,
                  company: data.company,
                });
              }}
            >
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="vcname">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    required
                    type="text"
                    placeholder="Enter Name"
                  />
                  <Form.Control.Feedback type="valid">
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Enter your Name
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="vcemail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    required
                    type="email"
                    placeholder="Enter your mail"
                  />
                  <Form.Control.Feedback type="valid">
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Enter a Valid Email
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="vccover">
                  <Form.Label>Cover Letter Note</Form.Label>
                  <Form.Control name="coverletternote" as="textarea" rows="3" />
                  <Form.Control.Feedback type="valid">
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Enter your cove
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="vcfile">
                  <Form.Label>Upload your resume</Form.Label>
                  <Form.File
                    id="custom-file"
                    name="cfile"
                    label="Custom file input"
                    custom
                    required
                  />
                  <Form.Control.Feedback type="valid">
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Select a file
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapState = (state) => {
  console.log("JOB::STATE", state.users.job);
  const { users, authentication } = state;
  const { user } = authentication;

  return {
    user,
    users,
    job: state.users.job,
  };
};

const actionCreators = {
  submitUserReq: userActions.getSingleJob,
};

const connectedJobPage = connect(mapState, actionCreators)(JobPage);
export { connectedJobPage as JobPage };
