import React, { Component } from "react";
import "../startup.css";
import $ from "jquery";
import axios from "axios";
var cat_info_db = [];
var questions_from_db = [];
var individualInfoQuestiondescription = [];
var individualInfoQuestionId = [];
var cat_id;
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}
class individualInformation extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      cat_name: "",
      question: ""
    };
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    $(function() {
      $("#undo_redo").multiselect();
    });
    debugger;
    var cat_name = sessionStorage.getItem("catName");
    this.setState({ cat_name: cat_name });
    const userData = {
      name: cat_name
    };
    axios
      .get("http://localhost:6007/categoryInfo/getcategoryInfo", userData)
      .then(response => {
        console.log(response);
        cat_info_db = response.data.categoryLocalData;

        for (var i = 0; i < cat_info_db.length; i++) {
          if (cat_info_db[i].name == cat_name) {
            this.setState({ cat_name: cat_name });
            cat_id = cat_info_db[i]._id;
          }
        }

        // counter = cat_info_db.length;
        // this.setState({ cat_name: cat_info_db[counter - 1].name });
        // cat_id = cat_info_db[counter - 1]._id;
      })
      .catch(error => {
        console.log(error.response);
      });
    //showLoader();
    axios
      .get(
        "http://localhost:6007/individualInformation/getIndividualInformation"
      )
      .then(response => {
        //console.log(response);
        //  hideLoader();
        questions_from_db = response.data.individualLocalData;
        console.log(questions_from_db);
        console.log(questions_from_db.length);
        //index = questions_from_db.length;

        //console.log(index);
        debugger;
        var q_Options = "";
        for (var i = 0; i < questions_from_db.length; i++) {
          q_Options +=
            "<option value='" +
            i +
            "'>" +
            questions_from_db[i].q_desc +
            "   </option>";
        }
        document.getElementById("undo_redo").innerHTML = q_Options;
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  onSubmit() {
    let index = 0;
    $("#undo_redo_to > option").each(function() {
      individualInfoQuestiondescription[index] = $(this).text();
      individualInfoQuestionId[index] = $(this).val();
      index = index + 1;
      console.log(individualInfoQuestiondescription);
      console.log(individualInfoQuestionId);
      console.log(individualInfoQuestiondescription.length);
    });
    debugger;

    for (let i = 0; i < individualInfoQuestiondescription.length; i++) {
      debugger;
      const userData = {
        cat_id: cat_id,
        q_Id: individualInfoQuestionId[i],
        q_desc: individualInfoQuestiondescription[i]
      };
      //  showLoader();
      axios
        .post(
          "http://localhost:6007/savedIndividualInfo/savedInfoQuestions",
          userData
        )
        .then(response => {
          console.log(response);
          // hideLoader();
          this.props.history.push(`/section1`);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }

  onSubmit1(e) {
    const userData = {
      question: this.state.question
    };
    // showLoader();
    axios
      .post(
        "http://localhost:6007/individualInformation/addIndividualInformation",
        userData
      )
      .then(response => {
        console.log(response);
        this.props.history.push(`/asset`);
        //  hideLoader();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    //goToTop();
    return (
      <div>
        <nav className="main-menu">
          <ul>
            <li>
              <a href="/category" style={{ marginTop: "120%" }}>
                <i class="fas fa-plus-square fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b> Create Category</b>
                </span>
              </a>
            </li>

            <li style={{ marginTop: "20%" }}>
              <a href="/section1">
                <i class="fas fa-user fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Section1-Individual Information</b>
                </span>
              </a>
            </li>
            <li className="dropdown has-subnav" style={{ marginTop: "20%" }}>
              <a href="/asset">
                <i class="fas fa-money-check-alt fa-2x" />
                <span className=" nav-text" style={{ color: "white" }}>
                  <b>Section2-Financial Condition</b>
                </span>
                <div class="dropdown-content">
                  <ul>
                    <li>
                      <a href="/asset" style={{ color: "white" }}>
                        Asset
                      </a>
                    </li>
                    <li>
                      <a href="/liabilities" style={{ color: "white" }}>
                        Liabilities
                      </a>
                    </li>
                  </ul>
                </div>
              </a>
            </li>
            <li className="dropdown has-subnav" style={{ marginTop: "20%" }}>
              <a href="/annualIncome">
                <i class="fas fa-search-dollar fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Section3-Annual Report</b>
                </span>
                <div class="dropdown-content">
                  <ul>
                    <li>
                      <a href="/annualIncome" style={{ color: "white" }}>
                        Annual Income
                      </a>
                    </li>
                    <li>
                      <a href="/annualExpenditures" style={{ color: "white" }}>
                        Annual Expenditures
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contingentLiabilities"
                        style={{ color: "white" }}
                      >
                        Contingent Liabilities
                      </a>
                    </li>
                  </ul>
                </div>
              </a>
            </li>
          </ul>

          <ul className="logout">
            <li>
              <a href="#">
                <i className="fa fa-power-off fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Logout</b>
                </span>
              </a>
            </li>
          </ul>
        </nav>

        <div style={{ paddingTop: "1%" }} className="container">
          <div className="overlay">
            <div id="loading-img" />
          </div>
          <h1 style={{ fontSize: "55px" }}>Individual Information</h1>
          <h1 style={{ fontSize: "55px" }}>Section1</h1>

          <form noValidate onSubmit={this.onSubmit}>
            <div style={{ padding: "3%" }}>
              <div
                style={{ alignContent: "center" }}
                id="reg1"
                className="register"
              >
                <input
                  id="tab1"
                  type="radio"
                  name="tabs"
                  defaultChecked="true"
                />
                <label htmlFor="tab1">Choose Questions</label>

                <input id="tab2" type="radio" name="tabs" />
                <label htmlFor="tab2">Add Questions</label>
                <section id="content1">
                  <div className="col-md-8">
                    <div
                      style={{ paddingLeft: "40%" }}
                      className="input-group mb-3"
                    >
                      <div className="input-group-prepend">
                        <span className="input-group-text">Category Name</span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        name="cat_name"
                        value={this.state.cat_name}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="row col-md-12">
                    <div
                      style={{ paddingTop: "8%", float: "left" }}
                      className="col-md-5"
                    >
                      <select
                        name="questions"
                        id="undo_redo"
                        className="form-control"
                        size="10"
                        multiple="multiple"
                        style={{ overflow: "scroll" }}
                        value={this.state.questions}
                        onChange={this.onChange}
                      />
                    </div>
                    <div
                      style={{ paddingTop: "9.5%", paddingLeft: "8%" }}
                      className="col-md-2"
                    >
                      <button
                        type="button"
                        id="undo_redo_rightAll"
                        className="btn btn-block"
                      >
                        <i className="fas fa-forward" />
                        {/* <i className="glyphicon glyphicon-forward" /> */}
                      </button>
                      <button
                        type="button"
                        id="undo_redo_rightSelected"
                        className="btn btn-block"
                      >
                        <i className="fas fa-chevron-right" />
                        {/* <i className="glyphicon glyphicon-chevron-right" /> */}
                      </button>
                      <button
                        type="button"
                        id="undo_redo_leftSelected"
                        className="btn btn-block"
                      >
                        <i className="fas fa-chevron-left" />
                        {/* <i className="glyphicon glyphicon-chevron-left" /> */}
                      </button>
                      <button
                        type="button"
                        id="undo_redo_leftAll"
                        className="btn btn-block"
                      >
                        <i className="fas fa-backward" />
                        {/* <i className="glyphicon glyphicon-backward" /> */}
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => this.onSubmit()}
                        style={{ marginTop: "67%" }}
                      >
                        Save
                      </button>
                    </div>
                    <div
                      style={{
                        paddingTop: "8%",
                        paddingLeft: "7%",
                        float: "right"
                      }}
                      className="col-md-5"
                    >
                      <select
                        name="to"
                        id="undo_redo_to"
                        className="form-control"
                        size="10"
                        multiple="multiple"
                        style={{ overflow: "scroll" }}
                        onChange={this.getSelectValue}
                      />
                    </div>
                  </div>
                </section>

                <section id="content2">
                  <div className="promos">
                    <div className="row col-md-12">
                      <div
                        className="input-group mb-3"
                        style={{ paddingTop: "20%" }}
                      >
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroup-sizing-default"
                          >
                            Write your question here
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          name="question"
                          value={this.state.question}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => this.onSubmit1()}
                    >
                      Save
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default individualInformation;
