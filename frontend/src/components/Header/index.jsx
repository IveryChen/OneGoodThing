import React from "react";
import { LiaPlusSolid } from "react-icons/lia";

import Box from "../../components/Box";
import { theme } from "../../constants/constants";

export default class Header extends React.PureComponent {
  onClick = () => {
    this.props.onChangeIsOpen(true);
  };

  render() {
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
