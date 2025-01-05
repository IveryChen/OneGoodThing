import React from "react";
import { map } from "lodash";

import Box from "../../components/Box";
import Text from "../../components/Text";
import { stickies } from "../../constants/constants";

export default class Note extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <Box display="flex" flexWrap="wrap" gap={16} p={16}>
        {map(data, (note) => (
          <Box
            backgroundColor={stickies.lightyellow}
            key={note._id}
            p={16}
            width={200}
          >
            <Text color="gray">{note.text}</Text>
            <Text color="gray" fontSize="sm">
              {new Date(note.createdAt).toLocaleDateString()}
            </Text>
          </Box>
        ))}
      </Box>
    );
  }
}
