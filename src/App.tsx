import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Col, Grid, Row } from "react-styled-flexboxgrid";
import styled, { ThemeProvider } from "styled-components";
import Home from "./components/Home";
import List from "./components/List";

const TitleElement = styled.h1`
  text-align: center;
  margin-bottom: 0;
`;

const DescriptionElement = styled.h4`
  text-align: center;
  margin-top: 0.5em;
`;

const LinkElement = styled(Link)`
  text-decoration: none;
  color: #333;
`;

const theme = {
  flexboxgrid: {
    // Defaults
    gridSize: 12, // columns
    gutterWidth: 0, // rem
    outerMargin: 0, // rem
    mediaQuery: "only screen",
    container: {
      sm: 46, // rem
      md: 61, // rem
      lg: 76 // rem
    },
    breakpoints: {
      xs: 0, // em
      sm: 48, // em
      md: 64, // em
      lg: 75 // em
    }
  }
};

class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Grid>
            <Row center="xs">
              <Col>
                <LinkElement to="/">
                  <TitleElement>2do2gether</TitleElement>
                </LinkElement>
              </Col>
            </Row>
            <Row center="xs">
              <Col>
                <DescriptionElement>
                  Shared to-do list - plan your things together
                </DescriptionElement>
              </Col>
            </Row>
            <Row center="xs">
              <Col xs={12}>
                <Route path="/" exact component={Home} />
                <Route path="/:id" component={List} />
              </Col>
            </Row>
          </Grid>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
