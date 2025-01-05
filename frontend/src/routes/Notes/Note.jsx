import styled from "@emotion/styled";
import React from "react";
import { map } from "lodash";

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

    if (!data) {
      return null;
    }

    return (
      <Box
        alignContent="start"
        display="grid"
        gap={16}
        gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))"
        height="100%"
        p={16}
      >
        {map(data, (note) => (
          <StyledBox
            aspectRatio={1}
            backgroundColor={chooseColor(new Date(note.createdAt))}
            borderColor="gray"
            borderStyle="solid"
            borderWidth={1}
            display="grid"
            gridTemplateRows="auto 1fr"
            key={note._id}
            overflow="hidden"
            p={12}
          >
            <Text color={theme.lightbrown} fontSize={12} justifySelf="start">
              {new Date(note.createdAt).toLocaleDateString()}
            </Text>
            <Text color={theme.darkbrown} overflow="auto">
              {note.text}
            </Text>
          </StyledBox>
        ))}
      </Box>
    );
  }
}
