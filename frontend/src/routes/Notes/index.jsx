import { map } from "lodash";
import React from "react";
import { Async } from "react-async";

import { fetchNotes } from "../../api/fetchNotes";
import Box from "../../components/Box";
import Text from "../../components/Text";
import { theme } from "../../constants/constants";
import { withRouter } from "../../utils/withRouter";

import Header from "./Header";
import Note from "./Note";
import NoteModal from "./NoteModal";

class Notes extends React.PureComponent {
  state = { editId: null };

  onChangeEditId = (editId) => this.setState({ editId });

  onClose = () => this.setState({ editId: null });

  render() {
    const token = localStorage.getItem("token");

    return (
      <Async promiseFn={fetchNotes} token={token}>
        {this.renderBody}
      </Async>
    );
  }
  renderBody = ({ data: notes, error, isPending, reload }) => {
    const { editId } = this.state;

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
          <Header />
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
              <Note
                data={note}
                editId={editId}
                key={note._id}
                onChangeEditId={this.onChangeEditId}
                onNoteUpdated={reload}
              />
            ))}
          </Box>
          <NoteModal
            data={notes[editId]}
            isOpen={editId}
            onClose={this.onClose}
            onNoteUpdated={reload}
          />
        </Box>
      );
    }
  };
}

export default withRouter(Notes);
