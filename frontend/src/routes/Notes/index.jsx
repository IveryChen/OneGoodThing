import React from "react";
import { map } from "lodash";
import { Async } from "react-async";

import { fetchNotes } from "../../api/fetchNotes";
import Box from "../../components/Box";
import Text from "../../components/Text";
import { withRouter } from "../../utils/withRouter";

class Notes extends React.PureComponent {
  render() {
    const token = localStorage.getItem("token");

    return (
      <Async promiseFn={fetchNotes} token={token}>
        {this.renderBody}
      </Async>
    );
  }
  renderBody = ({ data: notes, error, isPending }) => {
    if (isPending) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;
    if (notes) {
      return (
        <Box display="flex" flexWrap="wrap" gap={16} p={16}>
          {map(notes, (note) => (
            <Box
              key={note._id}
              backgroundColor="lightyellow"
              p={16}
              width={200}
            >
              <Text>{note.text}</Text>
              <Text color="gray" fontSize="sm">
                {new Date(note.createdAt).toLocaleDateString()}
              </Text>
            </Box>
          ))}
        </Box>
      );
    }
  };
}

export default withRouter(Notes);
