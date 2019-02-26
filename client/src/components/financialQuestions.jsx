import React, { Component } from "react";
import "../startup.css";
import $ from "jquery";
import axios from "axios";
var cat_info_db = [];
var questions_from_db = [];
var financialQuestiondescription = [];
var financialQuestionId = [];
var data;
var cat_id;
class financialQuestions extends Component {
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

    axios
      .get("http://localhost:6007/financialQuestions/getfinancialQuestions")
      .then(response => {
        //console.log(response);
        questions_from_db = response.data.financialLocalData;
        console.log(questions_from_db);
        console.log(questions_from_db.length);
        //index = questions_from_db.length;
        var q_Options = "<option value='0'></option>";
        //console.log(index);
        debugger;

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

  onSubmit1(e) {
    const userData = {
      question: this.state.question
    };
    axios
      .post(
        "http://localhost:6007/financialQuestions/addfinancialQuestions",
        userData
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
    this.props.history.push(`/financialQuestions`);
  }
  onSubmit() {
    let index = 0;
    $("#undo_redo_to > option").each(function() {
      financialQuestiondescription[index] = $(this).text();
      financialQuestionId = $(this).val();
      index = index + 1;
      console.log(financialQuestiondescription);
      console.log(financialQuestionId);
    });
    for (let i = 0; i < financialQuestiondescription.length; i++) {
      debugger;
      const userData = {
        cat_id: cat_id,
        q_desc: financialQuestiondescription[i],
        q_Id: financialQuestionId[i]
      };
      axios
        .post(
          "http://localhost:6007/savedFinancialQuestions/savedFinancialQuestions",
          userData
        )
        .then(response => {
          // alert(
          //   "Your Template has been created. Login into your account with the given credentials. Thank you. "
          // );
          this.props.history.push(`/admin`);
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
  render() {
    //goToTop();
    return (
      <div style={{ paddingTop: "5%" }} className="container">
        <h1 style={{ fontSize: "55px" }}>Financial Questions</h1>

        <form noValidate onSubmit={this.onSubmit}>
          <div style={{ padding: "4%" }}>
            <div
              style={{ alignContent: "center" }}
              id="reg1"
              className="register"
            >
              <input id="tab1" type="radio" name="tabs" defaultChecked="true" />
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
                      type="button"
                      className="btn btn-primary"
                      onClick={() => this.onSubmit()}
                      style={{ marginTop: "8%" }}
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
    );
  }
}

export default financialQuestions;
