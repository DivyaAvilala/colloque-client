import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Select from "./common/select";
import * as userService from "../services/userService";
import auth from "../services/authService";
import * as orgService from "../services/orgService";
import { NavLink } from "react-router-dom";

class RegisterForm extends Form {
  deptNames = [
    { name: "Computer Science & Engineering", id: "cse" },
    { name: "Artificial Intelligence & Machine learning", id: "csm" },
    { name: "Electronics & Communications Engineering", id: "ece" },
    { name: "Electrical & Electronics Engineering", id: "eee" },
    { name: "Information Technology", id: "it" },
    { name: "Mechanical Engineering", id: "me" },
    { name: "Civil Engineering", id: "civ" },
  ];
  async componentDidMount() {
    let orgNames = [];
    try {
      const { data } = await orgService.getOrgNames();
      orgNames = data.orgNames.map((x) => ({ id: x, name: x }));
    } catch (ex) {
      console.log(ex);
    }
    this.setState({ orgNames });
  }
  state = {
    data: {
      email: "",
      password: "",
      name: "",
      category: "",
      orgName: "",
      deptName: "",
    },
    orgNames: [],
    errors: {},
  };
  schema = {
    email: Joi.string().required().email().label("email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
    category: Joi.string().required().label("Category"),
  };

  onCategoryChange = (event) => {
    const category = event.target.value;
    const newdata = { ...this.state.data, category };
    if (category === "student" || category === "faculty") {
      this.schema.orgName = Joi.string().required().label("OrganizationName");
      this.schema.deptName = Joi.string().required().label("Department Name");
      newdata.orgName = "";
      newdata.deptName = "";
    } else {
      delete newdata.orgName;
      delete this.schema.orgName;
      delete newdata.deptName;
      delete this.schema.deptName;
    }
    this.setState({ data: newdata });
  };
  onOrgNameSelect = (orgName) => {
    const newdata = { ...this.state.data, orgName };
    this.setState({ data: newdata });
  };

  onDeptSelect = (deptName) => {
    const newData = { ...this.state.data, deptName };
    this.setState({ data: newData });
  };

  doSubmit = async () => {
    try {
      console.log("logging in dosubmit ", this.state);
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        const { field, message } = ex.response.data;
        errors[field] = message;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="form-container">
        <h1 className="text-center">Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="text-center mt-2">Select account type</div>
          <div className="center-chkbxs mb-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="admin"
                value="admin"
                onChange={this.onCategoryChange}
              />
              <label className="form-check-label" htmlFor="admin">
                Admin
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="faculty"
                value="faculty"
                onChange={this.onCategoryChange}
              />
              <label className="form-check-label" htmlFor="faculty">
                Faculty
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id="student"
                value="student"
                onChange={this.onCategoryChange}
              />
              <label className="form-check-label" htmlFor="student">
                Student
              </label>
            </div>
          </div>
          {this.state.data.category === "admin" && (
            <>{this.renderInput("name", "Organization Name")}</>
          )}
          {this.state.data.category && this.state.data.category !== "admin" && (
            <>
              <Select
                name="orgName"
                label="Select Organization Name"
                options={this.state.orgNames}
                onOptionSelect={this.onOrgNameSelect}
              ></Select>
              <Select
                name="deptName"
                label="Select Department"
                options={this.deptNames}
                onOptionSelect={this.onDeptSelect}
              ></Select>
              {this.renderInput("name", "Name")}
            </>
          )}
          {this.state.data.category && (
            <>
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password", "password")}
              <div className="center-with-flex">
                {this.renderButton("Register")}
              </div>
            </>
          )}
        </form>
        <div className="text-center">
          Have an account? <NavLink to="/login">Log in now</NavLink>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
