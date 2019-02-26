import React, { Component } from "react";
import "../startup.css";

import TextareaAutosize from "react-textarea-autosize";
import { goToTop } from "react-scrollable-anchor";
import axios from "axios";
import $ from "jquery";
var lenOfsection1Questions = "";
var savedIndividualInfo = [];
var data;
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}
class userSection1 extends Component {
  constructor() {
    super();

    this.state = {
      _id: "",
      saved_question: "",
      textarea: ""
    };
    this.state = {
      _id: "",
      saved_question: "",
      textarea: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    debugger;
    var _id = sessionStorage.getItem("UserID");
    var tempType = sessionStorage.getItem("userTempType");
    // var Email = sessionStorage.getItem("userEmail");
    //var _id = startupResponse.data.user[0]._id;
    const userData = {
      _id: _id
    };
    //console.log(userData);
    //showLoader();
    axios
      .get(
        "http://localhost:6007/savedIndividualInfo/getSelectedQuestions",
        userData
      )
      .then(response => {
        debugger;
        // this.data = response;
        console.log(response);
        hideLoader();

        var divHtml = "";

        savedIndividualInfo = response.data.savedInfoLocalData;
        console.log(savedIndividualInfo);
        lenOfsection1Questions = savedIndividualInfo.length;
        for (var i = 0; i < lenOfsection1Questions; i++) {
          if (tempType == savedIndividualInfo[i].cat_id) {
            divHtml += "<div class='row col-md-12  form-group'>";
            divHtml += "<div class='col-md-4'>";
            divHtml +=
              "<label id='" +
              i +
              "class='control-label' style=max-width: '140px'; word-wrap: 'break-word'>" +
              savedIndividualInfo[i].q_desc +
              "  </label>";
            divHtml += "</div>";
            divHtml += "<div class='controls col-md-8'>";
            divHtml +=
              "<textarea class='js-auto-size' rows='1' value='{this.state.textarea}' onChange='{this.onChange}' name='textArea' id='" +
              i +
              "' " +
              "style='width:100%;marginTop:10%;' ></textarea>";
            divHtml += "</div>";
            divHtml += "</div>";
          }
        }
        //style = "max-width: 140px; word-wrap: break-word";
        document.getElementById("divHtml").innerHTML = divHtml;
      })
      .catch(err => {
        console.log(err.response);
        // response.status(500).json({
        //   error: err
        // });
      });
  }
  onSubmit(e) {
    debugger;
    var UserId = sessionStorage.getItem("UserID");
    var message = "";
    var q_desc = "";
    e.preventDefault();
    for (var j = 0; j < lenOfsection1Questions; j++) {
      message = $("#" + j).val();
      q_desc = savedIndividualInfo[j];
      console.log(message);
      const userData = {
        _id: UserId,
        q_desc: q_desc,
        textarea: message
      };
      showLoader();
      axios
        .post(
          "http://localhost:6007/savedIndividualInfo/savedInfoAnswers",
          userData
        )
        .then(response => {
          console.log(response);
          hideLoader();
        })
        .catch(error => {
          console.log(error.response);
        });
    }
    this.props.history.push(`/userSection2`);
  }
  onSubmit1() {
    this.props.history.push(`/userSection1`);
  }

  render() {
    //goToTop();
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <div>
          <div class="overlay">
            <div id="loading-img" />
          </div>
          <h1>Section 1</h1>
          <div id="reg1" className="register">
            <input id="tab1" type="radio" name="tabs" defaultChecked="true" />
            <label htmlFor="tab1">Individual Information</label>
            <section id="content1">
              <div className="container" id="divHtml" />
            </section>
            <button
              type="submit"
              className="btn btn-primary btn-sm "
              style={{
                float: "left",
                display: "block",
                width: "15%",
                margin: "5px 0",
                background: "rgb(41, 138, 45)",
                borderColor: "rgb(41, 138, 45)"
              }}
              onClick={this.onSubmit1}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm "
              style={{
                float: "right",
                display: "block",
                width: "15%",
                margin: "5px 0",
                background: "rgb(41, 138, 45)",
                borderColor: "rgb(41, 138, 45)"
              }}
              onClick={this.onSubmit}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default userSection1;
