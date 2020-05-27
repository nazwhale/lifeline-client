import React from "react";
import { Link } from "react-router-dom";
import Button from "./atoms/Button";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = ({ loggedIn }) => {
  return (
    <Container>
      <h1>Lifeline</h1>

      {loggedIn && (
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button>One day I will log you out</Button>
        </Link>
      )}
    </Container>
  );
};

export default Header;
