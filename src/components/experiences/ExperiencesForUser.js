import React, { Component } from "react";
import styled from "styled-components";
import CreateExperience from "./CreateExperience";
import { theme } from "../../theme";

import { fetchFromAPI } from "../helpers/apiHelpers.js";

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`;

const scale = 1.5;

const Node = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  width: 10rem;
  padding-top: ${props => `${props.ysPrev * scale}rem`};
  height: ${props => `${props.yoExperience * scale}rem`};
  background-color: ${props => (props.gap ? "inherit" : theme.color.lightGrey)};
  border-left: 1px solid black;
  border-bottom: 1px solid ${theme.color.grey};
  cursor: pointer;

  &:hover {
    border-left: 1px solid ${theme.color.primary};
    color: ${theme.color.primary};
  }
`;

const Year = styled.strong`
  align-self: flex-end;
`;

class ExperiencesForUser extends Component {
  state = {
    experiences: [],
    error: null
  };

  componentDidMount() {
    this.getExperiencesForUserId();
  }

  getExperiencesForUserId = () => {
    const { token, user } = this.props;
    let experiences = [];
    let error = null;

    fetchFromAPI("GET", `experiences/user/${user.id}`, {}, token)
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
    const { token, user } = this.props;

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
        <Container>
          {experiences.map((e, i) => {
            // years since previous end date
            const prev = i === 0 ? user.birthDate : experiences[i - 1].end_date;
            const ysPrev = yearsSince(prev, e.start_date);

            // years of experience
            const yoExperience = yearsSince(e.start_date, e.end_date);
            return (
              <React.Fragment key={e.id}>
                {i === 0 && (
                  <>
                    <span
                      role="img"
                      aria-label="hatching"
                      style={{ fontSize: "24px" }}
                    >
                      🐣
                    </span>{" "}
                    <Year>{tsToYear(user.birthDate)}</Year>
                  </>
                )}
                {ysPrev !== 0 && <Node yoExperience={ysPrev} gap={true} />}
                <Node ysPrev={ysPrev} yoExperience={yoExperience}>
                  {e.title}
                </Node>
              </React.Fragment>
            );
          })}
        </Container>
        <CreateExperience
          token={token}
          userId={user.id}
          refetchExperiences={this.getExperiencesForUserId}
        />
      </>
    );
  }
}
export default ExperiencesForUser;

// {e.title} • {longTimestampToReadable(e.start_date)} to{" "}
// {longTimestampToReadable(e.end_date)}

function yearsSince(ts1, ts2) {
  const bd = new Date(ts1);
  const ts = new Date(ts2);
  const yearsBetween = ts.getFullYear() - bd.getFullYear();
  return yearsBetween;
}

function tsToYear(ts) {
  const d = new Date(ts);
  return d.getFullYear();
}

// function longTimestampToReadable(ts) {
//   return new Date(ts).toISOString().slice(0, 10);
// }
