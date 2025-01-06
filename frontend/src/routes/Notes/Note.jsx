import styled from "@emotion/styled";
import React from "react";
import { readableColor } from "polished";

import Box from "../../components/Box";
import Text from "../../components/Text";

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
    const readable = readableColor(data.color);

    return (
      <StyledBox
        aspectRatio={1}
        backgroundColor={data.color}
        display="grid"
        gridTemplateRows="auto 1fr"
        onClick={this.onClick}
        p={12}
      >
        <Text color={readable} fontSize={12} justifySelf="start">
          {new Date(data.createdAt).toLocaleDateString()}
        </Text>
        <Text color={readable} overflowX="hidden">
          {data.text}
        </Text>
      </StyledBox>
    );
  }
}
