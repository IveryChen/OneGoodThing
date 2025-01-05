import React from "react";
import { LiaArrowLeftSolid } from "react-icons/lia";

import Box from "../../components/Box";
import { theme } from "../../constants/constants";

export default class Header extends React.PureComponent {
  render() {
    return (
      <Box
        alignSelf="center"
        as={LiaArrowLeftSolid}
        color={theme.beige}
        cursor="pointer"
        justifySelf="start"
        onClick={this.onClick}
        size={32}
      />
    );
  }
}
