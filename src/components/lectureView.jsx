import React, { Component } from "react";
import { getVideoById } from "../services/videoService";
import { List } from "antd";
import auth from "../services/authService";

//For playing the video

class LectureView extends Component {
  state = { lecture: {}, user: {} };

  //Getting the current video info
  componentWillMount = async () => {
    const user = auth.getCurrentUser();
    this.setState({ user });
    const { id } = this.props.match.params;
    const { data } = await getVideoById(id);
    if (data) {
      this.setState({ lecture: data });
    } else {
      alert("Failed to get video info");
    }
  };

  render() {
    return (
      <div className="postPage" style={{ width: "100%", padding: "10px 4em" }}>
        <video
          style={{ width: "100%" }}
          src={`http://localhost:5000/${this.state.lecture.videoPath}`}
          height="650"
          controls
        ></video>

        <List.Item>
          <List.Item.Meta
            title={this.state.lecture.title}
            description={this.state.lecture.description}
          />
          <div></div>
        </List.Item>
      </div>
    );
  }
}

export default LectureView;
