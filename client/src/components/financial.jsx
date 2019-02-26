import React, { Component } from "react";
import "../startup.css";
import ReactDOM from "react-dom";
import { goToTop } from "react-scrollable-anchor";
import $ from "jquery";
import axios from "axios";
var financialResponse = [];
var lenOfFinancialQuestions = 0;
class financial extends Component {
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
    axios
      .get(
        "http://localhost:6007/savedFinancialQuestions/getSelectedQuestions",
        userData
      )
      .then(response => {
        debugger;
        // this.data = response;
        console.log(response);
        var savedFinancial = [];

        var divHtml = "";

        savedFinancial = response.data.savedFinancialLocalData;
        lenOfFinancialQuestions = savedFinancial.length;
        for (var i = 0; i < lenOfFinancialQuestions; i++) {
          if (tempType == savedFinancial[i].cat_id) {
            divHtml += "<div class='row col-md-12  form-group'>";
            divHtml += "<div class='col-md-6'>";
            divHtml +=
              "<label id='" +
              i +
              "class='control-label' style=max-width: '140px'; word-wrap: 'break-word'>" +
              savedFinancial[i].q_desc +
              "  </label>";
            divHtml += "</div>";
            divHtml += "<div class='controls col-md-6'>";
            // divHtml += "<div class='input-group'>";
            // divHtml += "<div class='input-group-addon'>$";
            // divHtml += "</div>";
            divHtml +=
              "<input type='number' min='0' step='0.01' data-number-to-fixed='2' data-number-stepfactor='100' class='form-control currency'  value='{this.state.textarea}' onChange='{this.onChange}' name='textArea' id='" +
              i +
              "' >" +
              "</input>";
            // divHtml += "</div>";
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
    for (var j = 0; j < lenOfFinancialQuestions; j++) {
      message = $("#" + j).val();

      const userData = {
        _id: UserId,
        textarea: message
      };

      axios
        .post(
          "http://localhost:6007/customerFinancialQuestions/financialPage",
          userData
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
    this.props.history.push(`/apply4loan`);
  }
  render() {
    // goToTop();
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <div style={{ padding: "4%" }}>
          <div class="overlay">
            <div id="loading-img" />
          </div>
          <h1>Financial Information</h1>
          <div id="reg1" className="register">
            <input id="tab1" type="radio" name="tabs" defaultChecked="true" />
            <label htmlFor="tab1">Financial Plan Overflow</label>

            {/* <input id="tab2" type="radio" name="tabs" />
        <label htmlFor="tab2">startup</label> */}

            {/* <input id="tab3" type="radio" name="tabs" />
        <label htmlFor="tab3">Stack Overflow</label>

        <input id="tab4" type="radio" name="tabs" />
        <label htmlFor="tab4">Bitbucket</label> */}

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

export default financial;
