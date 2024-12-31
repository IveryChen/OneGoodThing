import React from "react";
import { MdAdd } from "react-icons/md";

import Box from "../../components/Box";
import { theme } from "../../constants/constants";

export default class Header extends React.PureComponent {
  onClick = () => {
    this.props.onChangeIsOpen(true);
  };

  render() {
    return (
      <Box height={56} p="8px">
        <Box
          display="grid"
          justifyContent="center"
          justifySelf="end"
          size={32}
          onClick={this.onClick}
        >
          <Box as={MdAdd} color={theme.darkgray} size="100%" />
        </Box>
      </Box>
    );
  }
}
