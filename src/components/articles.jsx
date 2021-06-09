import React, { Component } from "react";
import { getArticles, deleteArticle } from "../services/articleService";
import auth from "../services/authService";
class Articles extends Component {
  state = { articles: [], type: "", user: {}, searchParam: "" };

  onArticleChange = async (event) => {
    const type = event.target.value;
    const searchParam = this.state.searchParam;
    this.setState({ type });
    const { data } = await getArticles({ type, searchParam });
    this.setState({ articles: data });
  };
  onDelete = async (id) => {
    try {
      await deleteArticle(id);
      window.location.href = "/home/articles";
    } catch (e) {
      console.log("some thing went wrong");
    }
  };

  onSearchChange = async (event) => {
    const searchParam = event.target.value;
    this.setState({ searchParam });
    if (searchParam === "") {
      const { type, dept } = this.state;
      const { data } = await getArticles({ type, dept, searchParam });
      this.setState({ articles: data });
    }
  };

  onSearch = async () => {
    const { type, searchParam } = this.state;
    const { data } = await getArticles({ type, searchParam });
    this.setState({ articles: data });
  };

  componentWillMount = async () => {
    const user = auth.getCurrentUser();
    this.setState({ user });
    const searchParam = this.state.searchParam;
    const { data } = await getArticles({ type: "allArticles", searchParam });
    this.setState({ articles: data, type: "allArticles" });
  };
  render() {
    return (
      <>
        <a href="articles/new">
          <div className="floating-add-btn shadow-lg">
            <i className="fas fa-4x fa-plus"> </i>
          </div>
        </a>

        <div className="container">
          <div className="input-group mt-3">
            <input
              className="form-control py-2"
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
          <div>
            <div
              className="btn-group btn-group-toggle mt-3"
              data-toggle="buttons"
            >
              <label
                htmlFor="allArticles"
                className="btn btn-primary shadow-none active"
              >
                <input
                  type="radio"
                  name="options"
                  id="allArticles"
                  value="allArticles"
                  checked={this.state.type === "allArticles"}
                  onChange={this.onArticleChange}
                />
                All Articles
              </label>
              {this.state.user.category !== "admin" && (
                <label
                  htmlFor="myArticles"
                  className="btn btn-primary shadow-none"
                >
                  <input
                    type="radio"
                    name="options"
                    id="myArticles"
                    value="myArticles"
                    checked={this.state.type === "myArticles"}
                    onChange={this.onArticleChange}
                  />
                  My Articles
                </label>
              )}
            </div>
          </div>

          <div className="articles-cnt">
            <div className="row">
              {this.state.articles.map((article, i) => (
                <div className="col-12 col-md-6 col-lg-4" key={i + "article"}>
                  <div className="card article-card shadow">
                    <div
                      className="card-header text-uppercase font-weight-bold"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>{article.title}</div>

                      {(article.authorId === this.state.user._id ||
                        this.state.user.category === "admin") && (
                        <div style={{ minWidth: "60px" }}>
                          <i
                            className="fas fa-trash float-right"
                            style={{
                              fontSize: "1.5rem",
                              marginLeft: "5px",
                              color: "#007bff",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              this.onDelete(article.id);
                            }}
                          ></i>
                          <a href={"articles/edit/" + article.id}>
                            <i
                              className="fas fa-edit float-right"
                              style={{ fontSize: "1.5rem" }}
                            ></i>
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="card-body">
                      <blockquote className="blockquote mb-0">
                        <p className="multiline-ellipsis">{article.content}</p>
                        <a href={"articles/" + article.id}>
                          <div className="btn btn-secondary mt-2 mb-2">
                            Read More
                          </div>
                        </a>
                        <footer className="blockquote-footer">
                          {article.author}
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {this.state.articles.length == 0 && (
              <div style={{ textAlign: "center" }} className="display-4">
                No Articles Found
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Articles;
