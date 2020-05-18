import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 1rem;
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
    const { refetchExperiences } = this.props;

    let createRsp = null;
    let error = null;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/experiences`,
        {
          title,
          start_date: startDate,
          end_date: endDate,
          user_id: 3
        },
        {
          headers: {
            Authorization:
              "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxNzcxODE0YmE2YTcwNjkzZmI5NDEyZGEzYzZlOTBjMmJmNWI5MjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjQ1NDk0ODM2MDM2LXZhbnJ2YTlwaGdjMmFrcXNxb3NhcW8wNmM5N3NiMzViLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjQ1NDk0ODM2MDM2LXZhbnJ2YTlwaGdjMmFrcXNxb3NhcW8wNmM5N3NiMzViLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA3MTQ2NzQzNzI3OTQ2NjQ2MjAyIiwiZW1haWwiOiJuYXptYWxpazA4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiMmp0R05udWxQX0g1WFV3Sk9zeVJFZyIsIm5hbWUiOiJOYXogTWFsaWsiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2dKYmdiaDlGQ1hjWkE4MzAyLUR6dWpidkUydEFxMFpkZWg2WlNXbWc9czk2LWMiLCJnaXZlbl9uYW1lIjoiTmF6IiwiZmFtaWx5X25hbWUiOiJNYWxpayIsImxvY2FsZSI6ImVuLUdCIiwiaWF0IjoxNTg5ODAwNTg1LCJleHAiOjE1ODk4MDQxODUsImp0aSI6IjExZWI1NmE3YjA5MDFhZmY5MzA5ZDc1OTdjYWIyNDQ4M2I5ODY0MWUifQ.oA9fKAK-wTKC6WUhSaejUG1CqwjeD8-V8OMnNgpGNpjTQsdCpIqA_zlA37bTRK1TeypHRYioCnAvUmHfX1I_WyBM9cXsjo-FczRyBkTd3gTBDXy91n9qnOGJkvry7KVjDmP6Cwtu6ZEkQ2M1lhgPz27jUbdEYiUWpqEubgv8gJbvPBcMwv0cOtbAYDtHUuPT8qFxP5ofb2S_1qUI6nM1bykBpK2W7ITMytJAZYmRCCc0K7qunTFVgg4qXCoaOEe1edY_pL5DUDs95TrJpju-JzcQwhvZnyzWV7qFtBc021GHHv8ONQ7UFNpUIg7_2dN1eL_jsecIw0BrHBTHHO5eMQ"
          }
        }
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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { title, startDate, endDate, error } = this.state;

    return (
      <>
        <h2>create experience</h2>
        <Form onSubmit={this.handleSubmit}>
          <Label>
            Name:
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleInputChange}
            />
          </Label>
          <Label>
            Start date:
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={this.handleInputChange}
            />
          </Label>
          <Label>
            End date:
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={this.handleInputChange}
            />
          </Label>

          <input type="submit" value="submit" />
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
