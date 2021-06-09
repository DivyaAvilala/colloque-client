import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Lectures from "./lectures";
import Articles from "./articles";
import Profile from "./profile";
import Navbar from "./navbar";
import ArticleView from "./articleView";
import ArticleEdit from "./articleEdit";
import Upload from "./uploadVideo";
import LectureView from "./lectureView";

const Home = ({ user }) => {
  if (!user) return <Redirect to="/login" />;
  return (
    <React.Fragment>
      <Navbar user={user} />
      <Switch>
        <Route path="/home/lectures/upload" component={Upload} />
        <Route path="/home/lectures/:id" component={LectureView} />
        <Route path="/home/lectures" component={Lectures} />

        <Route
          path="/home/articles/edit/:id"
          render={(props) => <ArticleEdit {...props} type="edit" />}
        />
        <Route
          path="/home/articles/new"
          render={(props) => <ArticleEdit {...props} type="new" />}
        />
        <Route path="/home/articles/:id" component={ArticleView} />
        <Route path="/home/articles" component={Articles} />
        <Route path="/home/profile" component={Profile} />
        <Redirect from="/home" to="/home/lectures" />
        <Redirect from="/home/*" to="/not-found" />
      </Switch>
    </React.Fragment>
  );
};
export default Home;
