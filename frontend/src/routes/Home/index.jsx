import styled from "@emotion/styled";
import React from "react";

import Box from "../../components/Box";
import Header from "../../components/Header";
import { withRouter } from "../../utils/withRouter";

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
    return (
      <Box display="grid">
        <Header />
        <StyledJar as="canvas" justifySelf="center" ref={this.ref} />
      </Box>
    );
  }
}

export default withRouter(Home);
