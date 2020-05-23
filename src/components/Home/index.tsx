import React, { Component } from "react";
import { Col, Grid, Row } from "react-styled-flexboxgrid";
import LinkGenerate from "./LinkGenerate";

export default class Home extends Component {
  render() {
    return (
      <Grid>
        <Row center="xs">
          <Col>Generate your list using button above</Col>
        </Row>
        <Row center="xs">
          <Col xs={12} md={6}>
            <LinkGenerate />
          </Col>
        </Row>
      </Grid>
    );
  }
}
