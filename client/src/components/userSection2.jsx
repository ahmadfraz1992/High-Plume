import React, { Component } from "react";
import "../startup.css";

import TextareaAutosize from "react-textarea-autosize";
import { goToTop } from "react-scrollable-anchor";
import axios from "axios";
import $ from "jquery";
var lenOfsection2Questions = "";
var data;
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}
class userSection2 extends Component {
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
      .get("http://localhost:6007/savedasset/getSelectedQuestions", userData)
      .then(response => {
        debugger;
        // this.data = response;
        console.log(response);
        hideLoader();
        var savedassetInfo = [];

        var divHtml = "";

        savedassetInfo = response.data.savedAssetLocalData;
        lenOfsection2Questions = savedassetInfo.length;
        divHtml +=
          "<h2 style= 'color:white; size:10px' >(Do not include assets of doubtful value and omit cents )";
        divHtml += "</h2>";
        for (var i = 0; i < lenOfsection2Questions; i++) {
          if (tempType == savedassetInfo[i].cat_Id) {
            divHtml += "<div class='row col-md-12  form-group'>";
            divHtml += "<div class='col-md-8'>";
            divHtml +=
              "<label id='" +
              i +
              "class='control-label' style=max-width: '140px'; word-wrap: 'break-word'>" +
              savedassetInfo[i].q_desc +
              "  </label>";
            divHtml += "</div>";
            divHtml += "<div class='controls col-md-4'>";
            divHtml +=
              "<input type='number' min='0' step='0.01' data-number-to-fixed='2' data-number-stepfactor='100' class='form-control currency'  value='{this.state.textarea}' onChange='{this.onChange}' name='textArea' id='" +
              i +
              "' >" +
              "</input>";
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

    const userData1 = {
      _id: _id
    };
    axios
      .get(
        "http://localhost:6007/savedLiabilities/getSelectedQuestions",
        userData1
      )
      .then(response => {
        var savedLiabilitiesInfo = [];

        var divHtml1 = "";

        savedLiabilitiesInfo = response.data.liabilitiesLocalData;
        lenOfsection2Questions = savedLiabilitiesInfo.length;
        divHtml1 += "<h2 style= 'color:white; size:10px' >(omit cents )";
        divHtml1 += "</h2>";
        for (var i = 0; i < lenOfsection2Questions; i++) {
          if (tempType == savedLiabilitiesInfo[i].cat_Id) {
            divHtml1 += "<div class='row col-md-12  form-group'>";
            divHtml1 += "<div class='col-md-8'>";
            divHtml1 +=
              "<label id='" +
              i +
              "class='control-label' style=max-width: '140px'; word-wrap: 'break-word'>" +
              savedLiabilitiesInfo[i].q_desc +
              "  </label>";
            divHtml1 += "</div>";
            divHtml1 += "<div class='controls col-md-4'>";
            divHtml1 +=
              "<input type='number' min='0' step='0.01' data-number-to-fixed='2' data-number-stepfactor='100' class='form-control currency'  value='{this.state.textarea}' onChange='{this.onChange}' name='textArea' id='" +
              i +
              "' >" +
              "</input>";
            divHtml1 += "</div>";
            divHtml1 += "</div>";
          }
        }
        //style = "max-width: 140px; word-wrap: break-word";
        document.getElementById("divHtml1").innerHTML = divHtml1;
      })
      .catch(err => {
        console.log(err.response);
      });
  }
  onSubmit(e) {
    debugger;
    var UserId = sessionStorage.getItem("UserID");
    var message = "";
    e.preventDefault();
    for (var j = 0; j < lenOfsection2Questions; j++) {
      message = $("#" + j).val();

      const userData = {
        _id: UserId,
        textarea: message
      };
      //showLoader();
      axios
        .post("http://localhost:6007/savedasset/savedAssetAnswers", userData)
        .then(response => {
          console.log(response);
          hideLoader();
        })
        .catch(error => {
          console.log(error.response);
        });
    }

    for (var j = 0; j < lenOfsection2Questions; j++) {
      message = $("#" + j).val();

      const userData = {
        _id: UserId,
        textarea: message
      };
      // showLoader();
      axios
        .post(
          "http://localhost:6007/savedLiabilities/savedLiabilitiesAnswers",
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
    this.props.history.push(`/userSection3`);
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
          <h1>Statement Of Financial Condition</h1>
          <h2 style={{ color: "white", fontSize: "30px" }}>Section 2</h2>
          <div id="reg1" className="register">
            <input id="tab1" type="radio" name="tabs" defaultChecked="true" />
            <label htmlFor="tab1">Asset</label>

            <input id="tab2" type="radio" name="tabs" />
            <label htmlFor="tab2">Liabilities</label>

            <section id="content1">
              <div className="container" id="divHtml" />
            </section>
            <section id="content2">
              <div className="container" id="divHtml1" />
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

export default userSection2;
