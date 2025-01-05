import styled from "@emotion/styled";
import React from "react";
import { map } from "lodash";

import Box from "../../components/Box";
import Text from "../../components/Text";
import { theme, stickies } from "../../constants/constants";

const StyledBox = styled(Box)`
  transition: all 0.3s ease;

  &:hover {
    box-shadow: -8px 8px ${theme.lightgray};
    transform: translate(8px, -8px);
  }
`;

export default class Note extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={16}
        p={16}
      >
        {map(data, (note) => (
          <StyledBox
            aspectRatio={1}
            backgroundColor={stickies.lightyellow}
            key={note._id}
            p={16}
          >
            <Text color="gray">{note.text}</Text>
            <Text color="gray" fontSize="sm">
              {new Date(note.createdAt).toLocaleDateString()}
            </Text>
          </StyledBox>
        ))}
      </Box>
    );
  }
}
