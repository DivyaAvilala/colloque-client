import React, { Component } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import Select from "./common/select";

import {
  uploadVideo,
  generateThumbnail,
  createVideo,
} from "../services/videoService";

class Upload extends Component {
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
    title: "",
    description: "",
    videoPath: "",
    videoName: "",
    thumbnailPath: "",
    videoDuration: "",
    deptName: "",
  };

  onSubmit = async () => {
    const data = this.state;
    console.log("state in uploadVideo ", data);
    try {
      await createVideo(data);
      window.location.href = "/home/lectures";
    } catch (e) {
      console.log(e);
      console.log("something went wrong try again");
    }
  };

  onCancel = () => {
    window.history.back();
  };

  handleChangeTitle = (event) => {
    const title = event.target.value;
    this.setState({ title });
  };

  onDeptSelect = (deptName) => {
    this.setState({ deptName });
  };

  handleChangeDecsription = (event) => {
    const description = event.target.value;
    this.setState({ description });
  };

  onDrop = async (files) => {
    try {
      const { data: uploadData } = await uploadVideo(files);
      if (uploadData.success) {
        const { fileName, filePath } = uploadData;
        this.setState({ videoPath: filePath, videoName: fileName });
        const { data: thumbnailData } = await generateThumbnail({
          fileName,
          filePath,
        });
        if (thumbnailData.success) {
          const { fileDuration, thumbsFilePath } = thumbnailData;
          this.setState({
            videoDuration: fileDuration,
            thumbnailPath: thumbsFilePath,
          });
        } else {
          alert("Failed to make the thumbnails");
        }
      } else {
        alert("failed to save the video in server");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <div className="container mt-5">
          <h3 className="text-center">Upload Video</h3>
          <div
            style={{
              margin: "0px auto",
              width: "fit-content",
              cursor: "pointer",
            }}
          >
            <Dropzone onDrop={this.onDrop} multiple={false} maxSize={800000000}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "320px",
                    height: "150px",
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <PlusOutlined style={{ fontSize: "3rem" }} />
                </div>
              )}
            </Dropzone>

            {this.state.thumbnailPath !== "" && (
              <div>
                <img
                  src={`http://localhost:5000/${this.state.thumbnailPath}`}
                  alt="haha"
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="videoUploadTitle" className="h5">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="videoUploadTitle"
              placeholder="Enter title..."
              onChange={this.handleChangeTitle}
              value={this.state.title}
            />
          </div>
          <div className="custom-select-upload-video">
            <Select
              name="deptName"
              label="Department"
              options={this.deptNames}
              onOptionSelect={this.onDeptSelect}
            ></Select>
          </div>
          <div className="form-group">
            <label htmlFor="videoDescription" className="h5">
              Description
            </label>
            <input
              type="textarea"
              className="form-control"
              id="videoDescription"
              placeholder="Enter title..."
              onChange={this.handleChangeDecsription}
              value={this.state.description}
            />
          </div>
          <div className="btn btn-success mt-3" onClick={this.onSubmit}>
            Save
          </div>
          <div className="btn btn-warning ml-2 mt-3" onClick={this.onCancel}>
            Cancel
          </div>
          {/* {
                 (this.props.type==="edit")  && (this.state.owner===this.state.articleOwner) &&  
                    <div className="btn btn-danger ml-2 mt-3" onClick={this.onDelete}>
                        Delete
                    </div>
                } */}
        </div>
      </>
    );
  }
}

export default Upload;
