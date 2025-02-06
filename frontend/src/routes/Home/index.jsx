import React from "react";
import { Async } from "react-async";

import { fetchNotes } from "../../api/fetchNotes";
import Box from "../../components/Box";
import Text from "../../components/Text";
import { theme } from "../../constants/constants";
import getDaysInYear from "../../utils/getDaysInYear";
import { withRouter } from "../../utils/withRouter";

import EditNoteModal from "./EditNoteModal";
import Footer from "./Footer";
import Header from "./Header";
import MeasuredGrid from "./MeasuredGrid";
import NoteModal from "./NoteModal";

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

  renderBody = ({ data, error, isPending, reload }) => {
    if (!data) {
      return null;
    }

    const { dateMap, notes } = data;
    const { editId, note, open, row } = this.state;

    if (isPending)
      return (
        <Text color={theme.darkgray} p="12px">
          Loading...
        </Text>
      );
    if (error) return <Text p="12px">Error: {error.message}</Text>;
    if (notes) {
      const allDays = getDaysInYear();

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
          <MeasuredGrid
            notes={notes}
            dateMap={dateMap}
            row={row}
            editId={editId}
            reload={reload}
            allDays={allDays}
            onChangeEditId={this.onChangeEditId}
          />
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
