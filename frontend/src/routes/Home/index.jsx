import React from "react";

import Box from "../../components/Box";
import Header from "../../components/Header";
import { withRouter } from "../../utils/withRouter";

import EditNoteModal from "./EditNoteModal";

class Home extends React.PureComponent {
  state = { isOpen: false, note: "" };

  onChangeIsOpen = (isOpen) => this.setState({ isOpen });

  onChangeNote = (note) => this.setState({ note });

  onClose = () => this.setState({ isOpen: false });

  render() {
    const { isOpen, note } = this.state;

    return (
      <>
        <Box display="grid">
          <Header onChangeIsOpen={this.onChangeIsOpen} />
        </Box>
        <EditNoteModal
          data={note}
          isOpen={isOpen}
          onChangeIsOpen={this.onChangeIsOpen}
          onChangeNote={this.onChangeNote}
          onClose={this.onClose}
        />
      </>
    );
  }
}

export default withRouter(Home);
