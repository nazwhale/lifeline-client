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
    const { token, userId } = this.props;
    let experiences = [];
    let error = null;

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/experiences/user/?user_id=${userId}`,
        {
          headers: {
            Authorization: token
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
    const { token, userId } = this.props;

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
        <h2>Experiences</h2>
        {experiences.map(e => {
          return (
            <p key={e.id}>
              {e.title} • {longTimestampToReadable(e.start_date)} to{" "}
              {longTimestampToReadable(e.end_date)}
            </p>
          );
        })}
        <CreateExperience
          token={token}
          userId={userId}
          refetchExperiences={this.getExperiencesForUserId}
        />
      </>
    );
  }
}

function longTimestampToReadable(ts) {
  return new Date(ts).toISOString().slice(0, 10);
}
