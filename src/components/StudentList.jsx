import { Component } from "react";
import PropTypes from "prop-types";
import "./students.scss";

export class StudentList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { students } = this.props;

    return (
      <div id="studentlist">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Group</th>
              <th>Does work?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => (
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.group}</td>
                <td>{student.doesWork ? "Yes" : "No"}</td>
                <td className="actions">
                  <button id="edit">Edit</button>
                  <button id="delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

StudentList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      group: PropTypes.string,
      doesWork: PropTypes.bool,
    })
  ),
};

export default StudentList;
