import { map } from "lodash";
import React from "react";
import { Async } from "react-async";

import { fetchNotes } from "../../api/fetchNotes";
import Box from "../../components/Box";
import Text from "../../components/Text";
import { theme } from "../../constants/constants";
import getDaysInYear from "../../utils/getDaysInYear";
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

  renderGridItems = (notes, dateMap, row, editId, reload) => {
    if (row === 10) {
      const allDays = getDaysInYear();
      return map(allDays, (day) => {
        const noteId = dateMap[day.toDateString()];
        if (!noteId) {
          return (
            <Box display="grid" key={day.toDateString()} size={36}>
              <Box
                alignSelf="center"
                bg={theme.lightgray}
                borderRadius="50%"
                justifySelf="center"
                size={4}
              />
            </Box>
          );
        }
        return (
          <Note
            data={notes[noteId]}
            editId={editId}
            key={noteId}
            onChangeEditId={this.onChangeEditId}
            onNoteUpdated={reload}
            row={row}
            showContent={false}
          />
        );
      });
    }

    return map(notes, (note) => (
      <Note
        data={note}
        editId={editId}
        key={note._id}
        onChangeEditId={this.onChangeEditId}
        onNoteUpdated={reload}
        row={row}
        showContent={row < 5}
      />
    ));
  };

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
      console.log(allDays);
      console.log(dateMap);

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
            gap={row === 10 ? 24 / row : 12}
            gridTemplateColumns={`repeat(${row}, 1fr)`}
            height="100%"
            overflow="auto"
            overflowX="hidden"
          >
            {this.renderGridItems(notes, dateMap, row, editId, reload)}
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
