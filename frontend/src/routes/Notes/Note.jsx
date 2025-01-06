import styled from "@emotion/styled";
import React from "react";
import { readableColor } from "polished";

import Box from "../../components/Box";
import Text from "../../components/Text";

const StyledBox = styled(Box)`
  transition: all 0.2s ease;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
`;

export default class Note extends React.PureComponent {
  onClick = () => this.props.onChangeEditId(this.props.data._id);

  render() {
    const { data } = this.props;
    const readable = readableColor(data.color);

    return (
      <StyledBox
        boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
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
