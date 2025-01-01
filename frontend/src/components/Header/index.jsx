import { branch } from "baobab-react/higher-order";
import React from "react";
import { LiaPlusSolid } from "react-icons/lia";

import Box from "../../components/Box";
import { theme } from "../../constants/constants";

class Header extends React.PureComponent {
  onClick = () => {
    this.props.onChangeIsOpen(true);
  };

  render() {
    const { user } = this.props;

    console.log("user", user);

    return (
      <Box
        display="flex"
        height={56}
        justifyContent="space-between"
        p="8px"
        width="100%"
      >
        <Box
          as={LiaPlusSolid}
          color={theme.darkgray}
          onClick={this.onClick}
          size={32}
        />
      </Box>
    );
  }
}

export default branch({ user: ["user"] }, Header);
