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
    box-shadow: -8px 8px ${theme.lightgray};
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
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))"
        gap={16}
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
            p={12}
            overflow="hidden"
          >
            <Text color="lightgray" justifySelf="start" fontSize={12}>
              {new Date(note.createdAt).toLocaleDateString()}
            </Text>
            <Text overflow="auto" color="gray">
              {note.text}
            </Text>
          </StyledBox>
        ))}
      </Box>
    );
  }
}
