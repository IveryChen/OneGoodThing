import styled from "@emotion/styled";
import React from "react";

import Box from "../../components/Box";
import Text from "../../components/Text";
import { theme } from "../../constants/constants";

import chooseColor from "./chooseColour";

const StyledBox = styled(Box)`
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(0.9);
  }
`;

export default class Note extends React.PureComponent {
  onClick = () => this.props.onChangeEditId(this.props.data._id);

  render() {
    const { data } = this.props;

    return (
      <StyledBox
        aspectRatio={1}
        backgroundColor={chooseColor(new Date(data.createdAt))}
        display="grid"
        gridTemplateRows="auto 1fr"
        onClick={this.onClick}
        p={12}
      >
        <Text color={theme.lightbrown} fontSize={12} justifySelf="start">
          {new Date(data.createdAt).toLocaleDateString()}
        </Text>
        <Text color={theme.darkgray} overflowX="hidden">
          {data.text}
        </Text>
      </StyledBox>
    );
  }
}
