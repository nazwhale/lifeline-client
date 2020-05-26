import React from "react";
import Button from "./atoms/Button";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = ({ loggedIn }) => {
  return (
    <Container>
      <h1>Lifeline</h1>
      {loggedIn && <Button>One day I will log you out</Button>}
    </Container>
  );
};

export default Header;
