import React, { Component } from "react";
import axios from "axios";
import CreateExperience from "./CreateExperience";

export default class Experiences extends Component {
  state = {
    experiences: [],
    error: null
  };

  componentDidMount() {
    this.getExperiencesForUserId();
  }

  getExperiencesForUserId = () => {
    const user_id = 3;
    let experiences = [];
    let error = null;
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/experiences/user/?user_id=${user_id}`,
        {
          headers: {
            Authorization:
              "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxNzcxODE0YmE2YTcwNjkzZmI5NDEyZGEzYzZlOTBjMmJmNWI5MjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjQ1NDk0ODM2MDM2LXZhbnJ2YTlwaGdjMmFrcXNxb3NhcW8wNmM5N3NiMzViLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjQ1NDk0ODM2MDM2LXZhbnJ2YTlwaGdjMmFrcXNxb3NhcW8wNmM5N3NiMzViLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA3MTQ2NzQzNzI3OTQ2NjQ2MjAyIiwiZW1haWwiOiJuYXptYWxpazA4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiMmp0R05udWxQX0g1WFV3Sk9zeVJFZyIsIm5hbWUiOiJOYXogTWFsaWsiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2dKYmdiaDlGQ1hjWkE4MzAyLUR6dWpidkUydEFxMFpkZWg2WlNXbWc9czk2LWMiLCJnaXZlbl9uYW1lIjoiTmF6IiwiZmFtaWx5X25hbWUiOiJNYWxpayIsImxvY2FsZSI6ImVuLUdCIiwiaWF0IjoxNTg5ODAwNTg1LCJleHAiOjE1ODk4MDQxODUsImp0aSI6IjExZWI1NmE3YjA5MDFhZmY5MzA5ZDc1OTdjYWIyNDQ4M2I5ODY0MWUifQ.oA9fKAK-wTKC6WUhSaejUG1CqwjeD8-V8OMnNgpGNpjTQsdCpIqA_zlA37bTRK1TeypHRYioCnAvUmHfX1I_WyBM9cXsjo-FczRyBkTd3gTBDXy91n9qnOGJkvry7KVjDmP6Cwtu6ZEkQ2M1lhgPz27jUbdEYiUWpqEubgv8gJbvPBcMwv0cOtbAYDtHUuPT8qFxP5ofb2S_1qUI6nM1bykBpK2W7ITMytJAZYmRCCc0K7qunTFVgg4qXCoaOEe1edY_pL5DUDs95TrJpju-JzcQwhvZnyzWV7qFtBc021GHHv8ONQ7UFNpUIg7_2dN1eL_jsecIw0BrHBTHHO5eMQ"
          }
        }
      )
      .then(function(rsp) {
        experiences = rsp.data.experiences;
      })
      .catch(function(error) {
        error = error.response;
      })
      .then(res => this.setState({ experiences, error }));
  };

  render() {
    const { experiences, error } = this.state;

    if (error) {
      return (
        <>
          <h2>error getting experiences</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>;
        </>
      );
    }
    return (
      <>
        <h2>experiences</h2>
        {experiences.map(e => {
          return (
            <p key={e.id}>
              {e.title} • {longTimestampToReadable(e.start_date)} to{" "}
              {longTimestampToReadable(e.end_date)}
            </p>
          );
        })}
        <CreateExperience refetchExperiences={this.getExperiencesForUserId} />
      </>
    );
  }
}

function longTimestampToReadable(ts) {
  return new Date(ts).toISOString().slice(0, 10);
}
