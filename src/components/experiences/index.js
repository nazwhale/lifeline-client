import React from "react";
import ExperiencesForUser from "./ExperiencesForUser";
import { UserContext } from "../../App";

const Experiences = ({ userId }) => {
  return (
    <UserContext.Consumer>
      {signedInUser => {
        console.log("context value", signedInUser);
        return <ExperiencesForUser user={signedInUser} />;
      }}
    </UserContext.Consumer>
  );
};

export default Experiences;
