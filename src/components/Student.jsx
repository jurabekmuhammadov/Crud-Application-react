import { Component, createRef } from "react";
import StudentList from "./StudentList";
import "./modal.scss";
import "./students.scss";

class Student extends Component {
  constructor(props) {
    super(props);

    this.fName = createRef();
    this.lName = createRef();
    this.group = createRef();
    this.dWork = createRef();

    this.state = {
      students: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          group: "React N32",
          doesWork: false,
        },
        {
          id: 2,
          firstName: "Bruce",
          lastName: "Lee",
          group: "React N45",
          doesWork: true,
        },
        {
          id: 3,
          firstName: "Sarah",
          lastName: "Earhart",
          group: "React N18",
          doesWork: false,
        },
      ],
      student: {
        firstName: "",
        lastName: "",
        group: "",
        doesWork: false,
      },

      isModalOpen: false,
      search: "",
      whichGroup: "All",
    };
  }
  render() {
    let { students, isModalOpen, student, search, whichGroup } = this.state;

    students = students.filter((student) =>
      student.firstName.toLowerCase().includes(search)
    );

    if (whichGroup !== "All") {
      students = students.filter((student) => student.group === whichGroup);
    }

    const openModal = () => {
      this.setState({ isModalOpen: !this.state.isModalOpen });
    };
    const closeModal = () => {
      this.setState({ isModalOpen: !this.state.isModalOpen });
      clearInputs();
    };

    const handleFnameChange = (e) => {
      this.setState({
        student: { ...student, firstName: e.target.value },
      });
    };
    const handleLnameChange = (e) => {
      this.setState({
        student: { ...student, lastName: e.target.value },
      });
    };
    const handleGroupChange = (e) => {
      this.setState({
        student: { ...student, group: e.target.value },
      });
    };
    const handleDwChange = (e) => {
      this.setState({
        student: { ...student, doesWork: e.target.checked },
      });
    };

    const clearInputs = () => {
      this.fName.current.value = "";
      this.lName.current.value = "";
      this.group.current.value = "";
      this.dWork.current.value = "";
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      let newStudents = [...students, student];
      this.setState({
        students: newStudents,
        student: { firstName: "", lastName: "", group: "", doesWork: false },
      });
      clearInputs();
      closeModal();
    };

    const handleSearch = (e) => {
      this.setState({ search: e.target.value.trim().toLowerCase() });
    };

    const handleGroup = (e) => {
      this.setState({ whichGroup: e.target.value });
    };

    return (
      <div className="container students__container">
        <h1>CRUD Application</h1>
        <div className="bar">
          <input
            className="search-input"
            onChange={handleSearch}
            type="search"
            placeholder="Search students"
            value={search}
          />
          <select onChange={handleGroup} name="filter" id="filter">
            <option value="All">All</option>
            <option value="React N32">React N32</option>
            <option value="React N45">React N45</option>
            <option value="React N18">React N18</option>
          </select>
          <button id="add" onClick={openModal}>
            Add
          </button>
        </div>
        <div id="modal" className={`${isModalOpen ? "modal-open" : ""} modal`}>
          <form onSubmit={handleSubmit}>
            <input
              required
              ref={this.fName}
              onChange={handleFnameChange}
              type="text"
              placeholder="Firstname"
            />
            <input
              required
              ref={this.lName}
              onChange={handleLnameChange}
              type="text"
              placeholder="Lastname"
            />
            <select
              required
              ref={this.group}
              onChange={handleGroupChange}
              name="filter"
              id="filterInModal"
            >
              <option value="All">All</option>
              <option value="React N32">React N32</option>
              <option value="React N45">React N45</option>
              <option value="React N18">React N18</option>
            </select>
            <div className="dWork">
              <input
                ref={this.dWork}
                onChange={handleDwChange}
                id="doesWork"
                type="checkbox"
              />
              <label htmlFor="doesWork">Does work?</label>
            </div>
            <button id="submit" type="submit">
              Submit
            </button>
          </form>
          <button onClick={closeModal} id="closeBtn">
            Close
          </button>
        </div>
        <StudentList students={students} search={search} />
      </div>
    );
  }
}

export default Student;
