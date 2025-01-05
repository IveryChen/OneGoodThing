import React from "react";

import IconButton from "../../components/IconButton";
import { withRouter } from "../../utils/withRouter";

class Notes extends React.PureComponent {
  render() {
    return <IconButton borderStyle="none" label="Sign in" />;
  }
}

export default withRouter(Notes);
