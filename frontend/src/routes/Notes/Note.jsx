import styled from "@emotion/styled";
import React from "react";

import Box from "../../components/Box";
import Text from "../../components/Text";
import { theme } from "../../constants/constants";

import chooseColor from "./chooseColour";

const StyledBox = styled(Box)`
  transition: all 0.2s ease;

  &:hover {
    box-shadow: -8px 8px ${theme.darkbrown};
    transform: translate(8px, -8px);
  }
`;

export default class Note extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <StyledBox
        aspectRatio={1}
        backgroundColor={chooseColor(new Date(data.createdAt))}
        borderColor="gray"
        borderStyle="solid"
        borderWidth={1}
        display="grid"
        gridTemplateRows="auto 1fr"
        p={12}
      >
        <Text color={theme.lightbrown} fontSize={12} justifySelf="start">
          {new Date(data.createdAt).toLocaleDateString()}
        </Text>
        <Text color={theme.darkbrown} overflowX="hidden">
          {data.text}
        </Text>
      </StyledBox>
    );
  }
}
