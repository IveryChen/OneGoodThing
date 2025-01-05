import { map } from "lodash";
import React from "react";
import { Async } from "react-async";

import { fetchNotes } from "../../api/fetchNotes";
import Box from "../../components/Box";
import Text from "../../components/Text";
import { theme } from "../../constants/constants";
import { withRouter } from "../../utils/withRouter";

import Note from "./Note";
import Header from "./Header";

class Notes extends React.PureComponent {
  state = { editMode: false };

  onChangeEditMode = (editMode) => this.setState(editMode);

  render() {
    const token = localStorage.getItem("token");

    return (
      <Async promiseFn={fetchNotes} token={token}>
        {this.renderBody}
      </Async>
    );
  }
  renderBody = ({ data: notes, error, isPending }) => {
    const { editMode } = this.state;

    if (isPending)
      return (
        <Text color={theme.darkgray} p="12px">
          Loading...
        </Text>
      );
    if (error) return <Text p="12px">Error: {error.message}</Text>;
    if (notes) {
      return (
        <Box
          display="grid"
          gridTemplateRows="auto 1fr"
          gap="12px"
          height="100%"
          overflow="hidden"
          p="12px"
          pb={0}
        >
          <Header
            editMode={editMode}
            onChangeEditMode={this.onChangeEditMode}
          />
          <Box
            alignContent="start"
            display="grid"
            gap="16px"
            gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))"
            height="100%"
            overflow="auto"
            pb="16px"
          >
            {map(notes, (note) => (
              <Note data={note} key={note._id} />
            ))}
          </Box>
        </Box>
      );
    }
  };
}

export default withRouter(Notes);
