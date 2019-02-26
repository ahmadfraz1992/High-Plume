import React, { Component } from "react";
import "../startup.css";

import TextareaAutosize from "react-textarea-autosize";
import { goToTop } from "react-scrollable-anchor";
import axios from "axios";
import $ from "jquery";
var lenOfsection3Questions = "";
var data;
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}
class userSection3 extends Component {
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
    var cat_id = sessionStorage.getItem("catinfo_id");
    var section = sessionStorage.getItem("section_name");
    // var Email = sessionStorage.getItem("userEmail");
    //var _id = startupResponse.data.user[0]._id;
    const userData = {
      //_id: _id,
      cat_id: cat_id
    };
    //console.log(userData);
    //showLoader();
    axios
      .get("http://localhost:6005/createCategory/getcategoryInfoWithParam", {
        params: {
          cat_id: cat_id
        }
      })
      .then(response => {
        debugger;
        // this.data = response;
        console.log(response);
        hideLoader();
        var savedSections = [];

        var divHtml = "";

        savedSections = response.data.categoryLocalData;
        lenOfsection3Questions = savedSections.length;

        for (var i = 0; i < lenOfsection3Questions; i++) {
          if (tempType == savedSections[i].cat_Id) {
            divHtml += "<div class='row col-md-12  form-group'>";
            divHtml += "<div class='col-md-8'>";
            divHtml +=
              "<label id='" +
              i +
              "class='control-label' style=max-width: '140px'; word-wrap: 'break-word'>" +
              savedSections[i].q_desc +
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

    //   const userData1 = {
    //     _id: _id
    //   };
    //   debugger;
    //   axios
    //     .get(
    //       "http://localhost:6005/savedAnnualExpenditures/getSelectedQuestions",
    //       userData1
    //     )
    //     .then(response => {
    //       var savedAnnualExpenditure = [];

    //       var divHtml1 = "";

    //       savedAnnualExpenditure = response.data.annualExpenditureLocalData;
    //       lenOfsection3Questions = savedAnnualExpenditure.length;

    //       for (var i = 0; i < lenOfsection3Questions; i++) {
    //         if (tempType == savedAnnualExpenditure[i].cat_Id) {
    //           divHtml1 += "<div class='row col-md-12  form-group'>";
    //           divHtml1 += "<div class='col-md-8'>";
    //           divHtml1 +=
    //             "<label id='" +
    //             i +
    //             "class='control-label' style=max-width: '140px'; word-wrap: 'break-word'>" +
    //             savedAnnualExpenditure[i].q_desc +
    //             "  </label>";
    //           divHtml1 += "</div>";
    //           divHtml1 += "<div class='controls col-md-4'>";
    //           divHtml1 +=
    //             "<input type='number' min='0' step='0.01' data-number-to-fixed='2' data-number-stepfactor='100' class='form-control currency'  value='{this.state.textarea}' onChange='{this.onChange}' name='textArea' id='" +
    //             i +
    //             "' >" +
    //             "</input>";
    //           divHtml1 += "</div>";
    //           divHtml1 += "</div>";
    //         }
    //       }
    //       //style = "max-width: 140px; word-wrap: break-word";
    //       document.getElementById("divHtml1").innerHTML = divHtml1;
    //     })
    //     .catch(err => {
    //       console.log(err.response);
    //     });

    //   const userData2 = {
    //     _id: _id
    //   };
    //   axios
    //     .get(
    //       "http://localhost:6005/savedContingentLiabilities/getSelectedQuestions",
    //       userData2
    //     )
    //     .then(response => {
    //       var savedContingentLiabilities = [];

    //       var divHtml2 = "";

    //       savedContingentLiabilities =
    //         response.data.contingentLiabilitiesLocalData;
    //       lenOfsection3Questions = savedContingentLiabilities.length;

    //       for (var i = 0; i < lenOfsection3Questions; i++) {
    //         if (tempType == savedContingentLiabilities[i].cat_Id) {
    //           divHtml2 += "<div class='row col-md-12  form-group'>";
    //           divHtml2 += "<div class='col-md-8'>";
    //           divHtml2 +=
    //             "<label id='" +
    //             i +
    //             "class='control-label' style=max-width: '140px'; word-wrap: 'break-word'>" +
    //             savedContingentLiabilities[i].q_desc +
    //             "  </label>";
    //           divHtml2 += "</div>";
    //           divHtml2 += "<div class='controls col-md-4'>";
    //           divHtml2 +=
    //             "<input type='number' min='0' step='0.01' data-number-to-fixed='2' data-number-stepfactor='100' class='form-control currency'  value='{this.state.textarea}' onChange='{this.onChange}' name='textArea' id='" +
    //             i +
    //             "' >" +
    //             "</input>";
    //           divHtml2 += "</div>";
    //           divHtml2 += "</div>";
    //         }
    //       }
    //       //style = "max-width: 140px; word-wrap: break-word";
    //       document.getElementById("divHtml2").innerHTML = divHtml2;
    //     })
    //     .catch(err => {
    //       console.log(err.response);
    //     });
  }
  onSubmit(e) {
    debugger;
    var UserId = sessionStorage.getItem("UserID");
    var message = "";
    e.preventDefault();
    for (var j = 0; j < lenOfsection3Questions; j++) {
      message = $("#" + j).val();

      const userData = {
        _id: UserId,
        textarea: message
      };
      showLoader();
      axios
        .post(
          "http://localhost:6005/savedAnnualIncome/savedAnnualIncomeAnswers",
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

    for (var j = 0; j < lenOfsection3Questions; j++) {
      message = $("#" + j).val();

      const userData = {
        _id: UserId,
        textarea: message
      };
      showLoader();
      axios
        .post(
          "http://localhost:6005/savedAnnualExpenditure/savedAnnualExpendituresAnswers",
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

    for (var j = 0; j < lenOfsection3Questions; j++) {
      message = $("#" + j).val();

      const userData = {
        _id: UserId,
        textarea: message
      };
      showLoader();
      axios
        .post(
          "http://localhost:6005/savedContingentLiailities/savedConingentLiabilitiesAnswers",
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
    this.props.history.push(`/mainPage`);
  }
  onSubmit1() {
    this.props.history.push(`/userSection2`);
  }

  render() {
    //goToTop();
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <div>
          <div class="overlay">
            <div id="loading-img" />
          </div>
          <h1>Section 3 </h1>
          <div id="reg1" className="register">
            <input id="tab1" type="radio" name="tabs" defaultChecked="true" />
            <label htmlFor="tab1">Annual Income</label>

            <input id="tab2" type="radio" name="tabs" />
            <label htmlFor="tab2">Annual Expenditure</label>

            <input id="tab3" type="radio" name="tabs" />
            <label htmlFor="tab3">Contingent Liabilities</label>

            <section id="content1">
              <div className="container" id="divHtml" />
            </section>
            <section id="content2">
              <div className="container" id="divHtml1" />
            </section>
            <section id="content3">
              <div className="container" id="divHtml2" />
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

export default userSection3;
