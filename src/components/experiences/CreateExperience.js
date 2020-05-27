import React, { Component } from "react";
import styled from "styled-components";
import { fetchFromAPI } from "../helpers/apiHelpers.js";

import { theme } from "../../theme";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  font-size: 16px;
`;

const SubmitButton = styled.input`
  font-size: 16px;
  background-color: ${props =>
    props.enabled ? theme.color.primary : theme.color.disabled};
  color: ${theme.color.white};
  width: 100px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: none;
`;

export default class CreateExperience extends Component {
  state = {
    title: "",
    startDate: "",
    endDate: "",
    createRsp: null,
    error: null
  };

  createExperience = () => {
    const { title, startDate, endDate } = this.state;
    const { token, userId, refetchExperiences } = this.props;

    let createRsp = null;
    let error = null;

    fetchFromAPI(
      "POST",
      "experiences",
      {
        title,
        start_date: startDate,
        end_date: endDate,
        user_id: userId
      },
      token
    )
      .then(function(rsp) {
        createRsp = rsp.data;
        if (rsp.data.code === "date_clash_experience") {
          error = rsp;
        }
      })
      .catch(function(error) {
        error = error.response;
      })
      .then(() => refetchExperiences())
      .then(res => this.setState({ createRsp, error }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.createExperience();
  };

  submitEnabled = () => {
    const { title, startDate, endDate } = this.state;
    return (
      title !== "" && startDate !== "" && endDate !== "" && startDate < endDate
    );
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { title, startDate, endDate, error } = this.state;

    const submitEnabled = this.submitEnabled();

    return (
      <>
        <h2>Create experience</h2>
        <Form onSubmit={this.handleSubmit}>
          <Label>
            Name
            <Input
              type="text"
              name="title"
              value={title}
              onChange={this.handleInputChange}
            />
          </Label>
          <Label>
            Start date
            <Input
              type="date"
              name="startDate"
              value={startDate}
              onChange={this.handleInputChange}
            />
          </Label>
          <Label>
            End date
            <Input
              type="date"
              name="endDate"
              value={endDate}
              onChange={this.handleInputChange}
            />
          </Label>

          <SubmitButton type="submit" value="Submit" enabled={submitEnabled} />
        </Form>
        {error && (
          <>
            <h2>error creating experience</h2>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </>
        )}
      </>
    );
  }
}
