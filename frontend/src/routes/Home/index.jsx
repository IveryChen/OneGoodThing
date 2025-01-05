import styled from "@emotion/styled";
import React from "react";

import Box from "../../components/Box";
import Header from "../../components/Header";
import { withRouter } from "../../utils/withRouter";

import EditNoteModal from "./EditNoteModal";
import ThreeJar from "./ThreeJar";
import Measure from "react-measure";

const StyledJar = styled(Box)`
  height: 640px;
  width: 100%;

  @media (min-width: 768px) {
    height: auto;
    width: 90%;
  }
`;

class Home extends React.PureComponent {
  ref = React.createRef();
  threeInstance = null;
  state = { isOpen: false, note: "" };

  onChangeIsOpen = (isOpen) => this.setState({ isOpen });

  onChangeNote = (note) => this.setState({ note });

  onClose = () => this.setState({ isOpen: false });

  componentDidMount() {
    const canvas = this.ref.current;
    this.threeInstance = new ThreeJar(canvas);
  }

  onResize = ({ bounds: { height, width } }) => {
    if (this.threeInstance) {
      this.threeInstance.resize(width, height);
    }
  };

  componentWillUnmount() {
    if (this.threeInstance) {
      this.threeInstance.destroy();
    }
  }

  render() {
    const { isOpen, note } = this.state;

    return (
      <>
        <Box display="grid">
          <Header onChangeIsOpen={this.onChangeIsOpen} />
          <Measure bounds onResize={this.onResize}>
            {this.renderBody}
          </Measure>
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

  renderBody = ({ measureRef }) => (
    <StyledJar
      as="canvas"
      justifySelf="center"
      ref={(element) => {
        this.ref.current = element;
        measureRef(element);
      }}
    />
  );
}

export default withRouter(Home);
