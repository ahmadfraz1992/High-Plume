import React, { Component } from "react";
import "../startup.css";
import ReactDOM from "react-dom";
import { goToTop } from "react-scrollable-anchor";
import axios from "axios";
import $ from "jquery";
var lenOfBusinessQuestions = "";
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}
class business extends Component {
  constructor() {
    super();

    this.state = {
      _id: "",
      saved_question: "",
      textarea: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    // this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    debugger;

    var _id = sessionStorage.getItem("UserId");
    var tempType = sessionStorage.getItem("userTempType");
    // var Email = sessionStorage.getItem("userEmail");
    //var _id = startupResponse.data.user[0]._id;
    const userData = {
      _id: _id
    };
    //console.log(userData);
    showLoader();
    axios
      .get(
        "http://localhost:6007/savedBusinessQuestions/getSelectedQuestions",
        userData
      )
      .then(response => {
        debugger;
        hideLoader;
        // this.data = response;
        console.log(response);
        var savedBusiness = [];

        var divHtml = "";

        savedBusiness = response.data.savedBusinessLocalData;
        lenOfBusinessQuestions = savedBusiness.length;
        for (var i = 0; i < lenOfBusinessQuestions; i++) {
          if (tempType == savedBusiness[i].cat_id) {
            divHtml += "<div class='row col-md-12  form-group'>";
            divHtml += "<div class='col-md-6'>";
            divHtml +=
              "<label id='" +
              i +
              "class='control-label' style=max-width: '140px'; word-wrap: 'break-word'  >" +
              savedBusiness[i].q_desc +
              "  </label>";
            divHtml += "</div>";
            divHtml += "<div class='controls col-md-6'>";
            divHtml +=
              "<textarea class='js-auto-size' rows='4' value='{this.state.textarea}' onChange='{this.onChange}' name='textArea' id='" +
              i +
              "' " +
              "style='width:100%;marginTop:10%;' ></textarea>";
            divHtml += "</div>";
            divHtml += "</div>";
          }
        }

        document.getElementById("divHtml").innerHTML = divHtml;
      })
      .catch(err => {
        console.log(err.response);
        // response.status(500).json({
        //   error: err
        // });
      });
    // financialResponse[0] = sessionStorage.getItem("startupResponse");
    // console.log(financialResponse);
    // this.state.s_question1 = financialResponse.s_question1;
  }
  onSubmit(e) {
    debugger;
    var UserId = sessionStorage.getItem("UserId");
    var message = "";
    e.preventDefault();
    for (var j = 0; j < lenOfBusinessQuestions; j++) {
      message = $("#" + j).val();

      const userData = {
        _id: UserId,
        textarea: message
      };

      axios
        .post(
          "http://localhost:6007/customerBusinessQuestions/businessPage",
          userData
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
    this.props.history.push(`/financial`);
  }
  render() {
    // goToTop();
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <div style={{ padding: "4%" }}>
          <div id="loaderdiv" className="overlay">
            <div id="loading-img" />
          </div>
          <h1>Business Information</h1>
          <div id="reg1" className="register">
            <input id="tab1" type="radio" name="tabs" defaultChecked="true" />
            <label htmlFor="tab1">Business Plan Overflow</label>

            {/* <input id="tab2" type="radio" name="tabs" />
            <label htmlFor="tab2">Competitors</label>

            <input id="tab3" type="radio" name="tabs" />
            <label htmlFor="tab3">Organizational Structure</label>

            <input id="tab4" type="radio" name="tabs" />
            <label htmlFor="tab4">Market Analysis</label> */}

            <section id="content1">
              <div className="container" id="divHtml" />
              {/* <div className=" row form-group required"> */}
              {/* <div className="col-md-4" id="divQuestions"> */}
              {/* <label
                    htmlFor="saved_question"
                    className="control-label  requiredField"
                    style={{ fontSize: "14px" }}
                    //name="saved_question"
                    id="saved_question"
                    value={this.state.saved_question}
                  /> */}
              {/* </div> */}
              {/* <div className="controls col-md-8" id="divTextAreas"> */}
              {/* <textarea
                    className="js-auto-size"
                    rows="1"
                    name="textarea"
                    value={this.state.textarea}
                    onChange={this.onChange}
                    style={{ width: "100%", marginTop: "5%" }}
                  /> */}
              {/* </div> */}
              {/* </div> */}
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

export default business;
