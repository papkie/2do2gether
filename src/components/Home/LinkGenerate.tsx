import React, { Component } from "react";

import styled from "styled-components";
import LinkBox from "./LinkBox";
import firebase from "../../firebase";

const Wrapper = styled.div`
  margin-top: 1em;
`;

const GenerateButton = styled.button`
  width: 100%;
  height: 48px;
  background: white;
  border: 1px solid #ddd;
  cursor: pointer;
`;

interface State {
  url: string | null;
}

export default class LinkGenerate extends Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      url: null
    };
  }

  generateLink = async () => {
    const firebaseRef = firebase.database().ref("lists");
    const result = await firebaseRef.push([
      {
        text: "First item",
        done: false
      }
    ]);
    this.setState({
      url: result.key
    });
  };

  render() {
    const url = this.state.url;

    return (
      <Wrapper>
        {url ? (
          <LinkBox
            link={location.protocol + "//" + location.host + "/" + url}
          />
        ) : (
          <GenerateButton onClick={this.generateLink}>
            Click here for new list
          </GenerateButton>
        )}
      </Wrapper>
    );
  }
}
