import styled from "@emotion/styled";
import React from "react";
import Measure from "react-measure";

import Box from "../../components/Box";
import IconButton from "../../components/IconButton";
import { theme } from "../../constants/constants";
import { withRouter } from "../../utils/withRouter";

import ThreeJar from "./ThreeJar";

const StyledJar = styled(Box)`
  height: 640px;
  width: 100%;

  @media (min-width: 768px) {
    height: auto;
    width: 90%;
  }
`;

class Lobby extends React.PureComponent {
  ref = React.createRef();
  threeInstance = null;

  onClick = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URL;
    const scope = "email profile";

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    window.location.href = googleAuthUrl;
  };

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
    return (
      <Box display="grid">
        <Measure bounds onResize={this.onResize}>
          {this.renderBody}
        </Measure>
        <IconButton
          color={theme.darkgray}
          justifySelf="center"
          label="Sign in"
          onClick={this.onClick}
        />
      </Box>
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

export default withRouter(Lobby);
