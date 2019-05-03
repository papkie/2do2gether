import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Col, Grid, Row } from "react-styled-flexboxgrid";
import styled from "styled-components";
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

class App extends Component {
  render() {
    return (
      <Router>
        <Grid>
          <Row center={"xs"}>
            <Col>
              <TitleElement>2do2gether</TitleElement>
            </Col>
          </Row>
          <Row center={"xs"}>
            <Col>
              <DescriptionElement>
                Shared to-do list - plan your things together
              </DescriptionElement>
            </Col>
          </Row>
          <Row>
            <Route path="/" exact component={Home} />
            <Route path="/:id" component={List} />
          </Row>
        </Grid>
      </Router>
    );
  }
}

export default App;
