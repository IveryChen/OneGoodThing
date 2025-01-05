import { map } from "lodash";
import React from "react";
import { Async } from "react-async";

import { fetchNotes } from "../../api/fetchNotes";
import Box from "../../components/Box";
import Text from "../../components/Text";
import { theme } from "../../constants/constants";
import { withRouter } from "../../utils/withRouter";

import Note from "./Note";

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
    if (isPending)
      return (
        <Text color={theme.beige} p={16}>
          Loading...
        </Text>
      );
    if (error) return <Text p={16}>Error: {error.message}</Text>;
    if (notes) {
      return (
        <Box
          display="grid"
          gap={16}
          gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))"
          height="100%"
          overflow="auto"
          p={16}
        >
          {map(notes, (note) => (
            <Note data={note} key={note._id} />
          ))}
        </Box>
      );
    }
  };
}

export default withRouter(Notes);
