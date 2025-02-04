import { map } from "lodash";
import React from "react";
import { Async } from "react-async";

import { fetchNotes } from "../../api/fetchNotes";
import Box from "../../components/Box";
import Text from "../../components/Text";
import { theme } from "../../constants/constants";
import { withRouter } from "../../utils/withRouter";

import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";
import NoteModal from "./NoteModal";
import EditNoteModal from "./EditNoteModal";

class Home extends React.PureComponent {
  state = { editId: null, note: "", open: false, row: 10 };

  onChangeEditId = (editId) => this.setState({ editId });

  onChangeIsOpen = (open) => this.setState({ open });

  onChangeNote = (note) => this.setState({ note });

  onChangeRow = (row) => this.setState({ row });

  onClose = () => this.setState({ editId: null, open: false });

  render() {
    const token = localStorage.getItem("token");

    return (
      <Async promiseFn={fetchNotes} token={token}>
        {this.renderBody}
      </Async>
    );
  }

  renderBody = ({ data: notes, error, isPending, reload }) => {
    const { editId, note, open, row } = this.state;

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
          gridTemplateRows="auto 1fr auto"
          height="100%"
          overflow="hidden"
          p="12px"
          pb={0}
        >
          <Header mb="12px" onChangeIsOpen={this.onChangeIsOpen} />
          <Box
            alignContent="start"
            display="grid"
            gap="8px"
            gridTemplateColumns={`repeat(${row}, 1fr)`}
            height="100%"
            overflow="auto"
            overflowX="hidden"
          >
            {map(notes, (note) => (
              <Note
                data={note}
                editId={editId}
                key={note._id}
                onChangeEditId={this.onChangeEditId}
                onNoteUpdated={reload}
                row={row}
                showContent={row < 5}
              />
            ))}
          </Box>
          <Footer onChangeRow={this.onChangeRow} row={row} />
          <NoteModal
            data={notes[editId]}
            isOpen={editId}
            onClose={this.onClose}
            onNoteUpdated={reload}
          />
          <EditNoteModal
            data={notes[editId]}
            isOpen={open}
            note={note}
            onChangeIsOpen={this.onChangeIsOpen}
            onChangeNote={this.onChangeNote}
            onClose={this.onClose}
            onNoteUpdated={reload}
          />
        </Box>
      );
    }
  };
}

export default withRouter(Home);
