import styled from "@emotion/styled";
import React from "react";

import Box from "../../components/Box";
import Header from "../../components/Header";
import { withRouter } from "../../utils/withRouter";

import NoteModal from "./NoteModal";
import { initThreeJS } from "./setUpThreeJS";

const StyledJar = styled(Box)`
  height: 640px;
  width: 100%;

  @media (min-width: 768px) {
    height: auto;
    width: 90%;
  }
`;

class Home extends React.PureComponent {
  state = { isOpen: false, note: "" };

  onChangeIsOpen = (isOpen) => this.setState({ isOpen });

  onChangeNote = (note) => this.setState({ note });

  onClose = () => this.setState({ isOpen: false });

  ref = React.createRef();
  threeInstance = null;

  componentDidMount() {
    if (this.ref.current) {
      this.threeInstance = initThreeJS(this.ref.current);
    }
  }

  componentWillUnmount() {
    if (this.threeInstance?.cleanup) {
      this.threeInstance.cleanup();
    }
  }

  render() {
    const { isOpen, note } = this.state;

    return (
      <>
        <Box display="grid">
          <Header onChangeIsOpen={this.onChangeIsOpen} />
          <StyledJar as="canvas" justifySelf="center" ref={this.ref} />
        </Box>
        <NoteModal
          data={note}
          isOpen={isOpen}
          onChangeNote={this.onChangeNote}
          onClose={this.onClose}
        />
      </>
    );
  }
}

export default withRouter(Home);
