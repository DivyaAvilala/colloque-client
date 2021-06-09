import React, { Component } from "react";
import auth from "../services/authService";
import { getVideos, deleteVideo } from "../services/videoService";
import Select from "./common/select";

// The landing page
class Lectures extends Component {
  deptNames = [
    { name: "Computer Science & Engineering", id: "cse" },
    { name: "Artificial Intelligence & Machine learning", id: "csm" },
    { name: "Electronics & Communications Engineering", id: "ece" },
    { name: "Electrical & Electronics Engineering", id: "eee" },
    { name: "Information Technology", id: "it" },
    { name: "Mechanical Engineering", id: "me" },
    { name: "Civil Engineering", id: "civ" },
  ];

  state = {
    lectures: [],
    type: "",
    dept: "",
    user: {},
    searchParam: "",
  };

  onLectureChange = async (event) => {
    const type = event.target.value;
    const dept = this.state.dept;
    const searchParam = this.state.searchParam;
    this.setState({ type });
    const { data } = await getVideos({ type, dept, searchParam });
    this.setState({ lectures: data });
  };

  onSearchChange = async (event) => {
    const searchParam = event.target.value;
    this.setState({ searchParam });
    if (searchParam === "") {
      const { type, dept } = this.state;
      const { data } = await getVideos({ type, dept, searchParam });
      this.setState({ lectures: data });
    }
  };

  onDeptSelect = async (dept) => {
    const type = this.state.type;
    this.setState({ dept });
    console.log("dept in change ", dept);
    const searchParam = this.state.searchParam;
    const { data } = await getVideos({ type, dept, searchParam });
    this.setState({ lectures: data });
  };

  onDelete = async (id) => {
    try {
      await deleteVideo(id);
      window.location.href = "/home/lectures";
    } catch (e) {
      console.log("some thing went wrong");
    }
  };

  onSearch = async () => {
    const { type, dept, searchParam } = this.state;
    const { data } = await getVideos({ type, dept, searchParam });
    this.setState({ lectures: data });
  };

  //Display all videos when the page loads
  componentWillMount = async () => {
    const user = auth.getCurrentUser();
    this.setState({ user });
    const dept = user.deptName;
    const type = "allLectures";
    const searchParam = this.state.searchParam;
    this.setState({ dept, type });
    const { data } = await getVideos({ type, dept, searchParam });
    console.log("All videos", data);
    this.setState({ lectures: data, type: "allLectures" });
  };

  render() {
    const videoCards = this.state.lectures.map((lecture, i) => {
      var minutes = Math.floor(lecture.videoDuration / 60);
      var seconds = Math.floor(lecture.videoDuration - minutes * 60);
      return (
        <div className="col-12 col-md-6 col-lg-4" key={i + "lecture"}>
          <div className="card article-card shadow">
            <div className="card-header text-uppercase font-weight-bold">
              {lecture.title}
              {(lecture.authorId === this.state.user._id ||
                this.state.user.category === "admin") && (
                <div
                  className="fas fa-trash float-right "
                  style={{ color: "#007bff" }}
                  onClick={() => {
                    this.onDelete(lecture.id);
                  }}
                ></div>
              )}
            </div>

            <div className="card-body">
              <div className="mb-0" style={{ position: "relative" }}>
                <a href={"lectures/" + lecture.id}>
                  <img
                    style={{ width: "100%" }}
                    alt="thumbnail"
                    src={`http://localhost:5000/${lecture.thumbnailPath}`}
                  />
                  <div
                    className=" duration"
                    style={{
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      margin: "4px",
                      color: "#fff",
                      backgroundColor: "rgba(17, 17, 17, 0.8)",
                      opacity: 0.8,
                      padding: "2px 4px",
                      borderRadius: "2px",
                      letterSpacing: "0.5px",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "12px",
                    }}
                  >
                    <span>
                      {minutes} : {seconds}
                    </span>
                  </div>
                </a>
              </div>
              <footer className="blockquote-footer">
                {lecture.authorName}
              </footer>
            </div>
          </div>
        </div>
      );
    });
    return (
      <>
        {this.state.user.category === "faculty" && (
          <a href="lectures/upload">
            <div className="floating-add-btn shadow-lg">
              <i className="fas fa-4x fa-plus"> </i>
            </div>
          </a>
        )}
        <div className="container">
          <div className="mt-3 custom-select-upload-video">
            <Select
              name="deptName"
              options={this.deptNames}
              selectedValue={this.state.dept}
              onOptionSelect={this.onDeptSelect}
            ></Select>
          </div>
          <div className="input-group mt-3">
            <input
              className="form-control  py-2"
              type="search"
              value={this.state.searchParam}
              onChange={this.onSearchChange}
            />
            <div className="input-group-append ">
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={this.onSearch}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div
            className="btn-group btn-group-toggle mt-3"
            data-toggle="buttons"
          >
            <label
              htmlFor="allLectures"
              className="btn btn-primary shadow-none active"
            >
              <input
                type="radio"
                name="options"
                id="allLectures"
                value="allLectures"
                checked={this.state.type === "allLectures"}
                onChange={this.onLectureChange}
              />
              All Lectures
            </label>
            {this.state.user.category === "faculty" && (
              <label
                htmlFor="myLectures"
                className="btn btn-primary shadow-none"
              >
                <input
                  type="radio"
                  name="options"
                  id="myLectures"
                  value="myLectures"
                  checked={this.state.type === "myLectures"}
                  onChange={this.onLectureChange}
                />
                My Lectures
              </label>
            )}
          </div>
          <div className="lectures-cnt">
            <div className="row">{videoCards}</div>
          </div>
          {this.state.lectures.length == 0 && (
            <div style={{ textAlign: "center" }} className="display-4">
              No Lectures Found
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Lectures;
