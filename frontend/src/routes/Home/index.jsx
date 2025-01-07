import React from "react";

import Box from "../../components/Box";
import Header from "../../components/Header";
import { withRouter } from "../../utils/withRouter";

import EditNote from "./EditNote";

class Home extends React.PureComponent {
  state = { note: "" };

  onChangeNote = (note) => this.setState({ note });

  render() {
    const { note } = this.state;

    return (
      <Box display="grid" gridTemplateRows="auto 1fr">
        <Header />
        <EditNote data={note} onChangeNote={this.onChangeNote} />
      </Box>
    );
  }
}

export default withRouter(Home);
