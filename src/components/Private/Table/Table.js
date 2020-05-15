import React, { useState } from "react";

const table = (props) => {
  const [visible, setVisble] = useState(false);

  if (visible) {
    return (
      <div className="container table-responsive">
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
            {props.jobs &&
              props.jobs.map((d) => {
                return (
                  <tr
                    onClick={() => {
                      jobClickHandler(d);
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
    );
  }
};

const jobClickHandler = (d) => {
  alert(d.company);
};

export default table;
