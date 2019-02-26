import React, { Component } from "react";
import axios from "axios";
class questions extends Component {
  constructor() {
    super();

    // this.state = {
    //   _id: "",
    //   question1: "",
    //   question2: "",
    //   question3: "",
    //   question4: "",
    //   question5: "",
    //   question6: "",
    //   question7: "",
    //   question8: "",
    //   question9: "",
    //   question10: "",
    //   question11: "",
    //   question12: "",
    //   question13: "",
    //   question14: "",
    //   question15: "",
    //   question16: "",
    //   question17: "",
    //   question18: "",
    //   question19: "",
    //   question20: "",
    //   question21: "",
    //   question22: "",
    //   question23: "",
    //   question24: "",
    //   question25: "",
    //   question26: "",
    //   question27: "",
    //   question28: "",
    //   question29: "",
    //   question30: "",
    //   question31: "",
    //   question32: "",
    //   question33: "",
    //   question34: "",
    //   question35: "",
    //   question36: "",
    //   question37: "",
    //   question38: "",
    //   question39: "",
    //   question40: ""
    // };
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onChange = this.onChange.bind(this);
  }
  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.value });
  // }
  componentDidMount() {
    axios
      .post("http://localhost:5000/addQuestions/addQuestions")
      .then(response => {})
      .catch(error => {
        console.log(error.response);
      });
  }
  render() {
    return (
      <div>
        {/* <label
          htmlFor="id_username"
          className="control-label  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question1"
          value={this.state.question1}
        >
          Name of your startup/Company?
        </label>
        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question2"
          value={this.state.question2}
        >
          Address of your startup?
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question3"
          value={this.state.question3}
        >
          Startup phone
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question4"
          value={this.state.question4}
        >
          How many founders are there?
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question5"
          value={this.state.question5}
        >
          How many employees are there?
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question6"
          value={this.state.question6}
        >
          Entity Type
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question7"
          value={this.state.question7}
        >
          Time in Business
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.3%" }}
          name="question8"
          value={this.state.question8}
        >
          What kind of role does it play in your society?
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.3%" }}
          name="question9"
          value={this.state.question9}
        >
          Is your startup is incorporated?
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.3%" }}
          name="question10"
          value={this.state.question10}
        >
          Describe your startup
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.3%" }}
          name="question11"
          value={this.state.question11}
        >
          Describe your startup
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question12"
          value={this.state.question12}
        >
          The legal structure of your business (corporation, sole
          proprietorship, etc.)
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question13"
          value={this.state.question13}
        >
          A brief history, the nature of your business, and the needs or demands
          you plan to supply
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question14"
          value={this.state.question14}
        >
          An overview of your products/services and suppliers
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question15"
          value={this.state.question15}
        >
          A summary of company growth, including financial or market highlights
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question16"
          value={this.state.question16}
        >
          A summary of your short- and long-term business goals, and how you
          plan to make a profit
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question17"
          value={this.state.question17}
        >
          List out the names of your competitors?(if any)
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question18"
          value={this.state.question18}
        >
          If you are first mover, how would your product standout in the future?
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question19"
          value={this.state.question19}
        >
          List the features that make your product/service different from
          competitors?
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question20"
          value={this.state.question20}
        >
          What are the strong advantages you have over your competitors?
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "0.8%" }}
          name="question21"
          value={this.state.question21}
        >
          Attach an organizational chart with descriptions of departments and
          key employees?
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question22"
          value={this.state.question22}
        >
          Information about owners, including their names, percentage of
          ownership, extent of involvement within the company and a biography
          listing their background and skills
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question23"
          value={this.state.question23}
        >
          Profiles of your management team, including their names, positions,
          main responsibilities and past experience?
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question24"
          value={this.state.question24}
        >
          List of any advisors, such as board members, accountants, and
          attorneys?
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question25"
          value={this.state.question25}
        >
          Describe your target market including size and demographics?
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question26"
          value={this.state.question26}
        >
          Mention the historical, current and projected marketing data of your
          company/service?
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.4%" }}
          name="question27"
          value={this.state.question27}
        >
          Explain the market role of your product/service?
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-4  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question28"
          value={this.state.question28}
        >
          How you’ll promote your business to customers and enter the market?
        </label>

        <label
          htmlFor="id_username"
          className="control-label col-md-8  requiredField"
          style={{ fontSize: "14px", padding: "1.2%" }}
          name="question29"
          value={this.state.question29}
        >
          What is the current monthly cash required to pay all founders,
          employees and expenses?
        </label>

        <label
          htmlFor="st_type"
          name="question30"
          value={this.state.question30}
        >
          How much total revenue your startup had in its lifetime?{" "}
        </label>

        <label
          htmlFor="st_coporated"
          name="question31"
          value={this.state.question31}
        >
          What is your monthly growth rate?{" "}
        </label>
        <label
          htmlFor="st_coporated"
          name="question32"
          value={this.state.question32}
        >
          What is your monthly growth rate?{" "}
        </label>

        <label htmlFor="fi_net" name="question33" value={this.state.question33}>
          {" "}
          Net profit per year?
        </label>

        <label
          htmlFor="fi_balance"
          name="question34"
          value={this.state.question34}
        >
          Average business bank balance?
        </label>
        <label
          htmlFor="fi_annual"
          name="question35"
          value={this.state.question35}
        >
          Personal annual income?
        </label>

        <label
          htmlFor="fi_loan"
          name="question36"
          value={this.state.question36}
        >
          Loan Amount
        </label>

        <label htmlFor="fi_Pcr" name="question37" value={this.state.question37}>
          Personal Credit Score
        </label>

        <label htmlFor="fi_Bcr" name="question38" value={this.state.question38}>
          {" "}
          Business Credit Score
        </label>

        <label htmlFor="fi_Bcr" name="question39" value={this.state.question39}>
          Annual Business Revenue and Profit Sheet
        </label>
        <label
          htmlFor="fi_BnkSheet"
          name="question40"
          value={this.state.question40}
        >
          Balance Sheet
        </label>
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
          onClick={this.onSubmit}
        >
          Add
        </button> */}
      </div>
    );
  }
}
export default questions;
