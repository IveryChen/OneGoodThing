import React from "react";

import IconButton from "../../components/IconButton";
import { withRouter } from "../../utils/withRouter";

class Lobby extends React.PureComponent {
  onClick = () => {
    this.props.navigate(`/home`);
  };

  render() {
    return (
      <IconButton borderStyle="none" label="Sign in" onClick={this.onClick} />
    );
  }
}

export default withRouter(Lobby);
