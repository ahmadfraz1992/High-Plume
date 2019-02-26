import React, { Component } from "react";
import "../startup.css";
import doc1 from "./doc1.png";
import addquestion from "./addquestion.png";
import createUser from "./createUser.jpg";
import TextareaAutosize from "react-textarea-autosize";
import { goToTop } from "react-scrollable-anchor";
import axios from "axios";

var data;
class questionTemplate extends Component {
  constructor() {
    super();

    // this.onSubmit = this.onSubmit.bind(this);
    // this.onSubmit1 = this.onSubmit1.bind(this);
    // this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {}
  onSubmit1(e) {
    this.props.history.push(`/registerCustomer`);
  }
  onSubmit2(e) {
    this.props.history.push(`/category`);
  }
  onSubmit3(e) {
    this.props.history.push(`/addQuestions`);
  }
  onSubmit(e) {}

  render() {
    //goToTop();
    return <div />;
  }
}

export default questionTemplate;
