import React from "react";
import { LiaArrowLeftSolid } from "react-icons/lia";

import Box from "../../components/Box";
import { theme } from "../../constants/constants";
import { withRouter } from "../../utils/withRouter";

class Header extends React.PureComponent {
  onClick = () => {
    this.props.navigate("/home");
  };

  render() {
    return (
      <Box
        alignSelf="center"
        as={LiaArrowLeftSolid}
        color={theme.darkgray}
        cursor="pointer"
        justifySelf="start"
        onClick={this.onClick}
        size={32}
      />
    );
  }
}

export default withRouter(Header);
