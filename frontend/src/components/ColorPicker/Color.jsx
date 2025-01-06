import React from "react";

import Box from "../../components/Box";
import { theme } from "../../constants/constants";

export default class Color extends React.PureComponent {
  onClick = () => this.props.onChangeColor(this.props.hex);

  render() {
    const { hex, selectedColor } = this.props;

    return (
      <Box
        backgroundColor={hex}
        border={`1px solid ${theme.darkgray}`}
        borderRadius="50%"
        cursor="pointer"
        key={hex}
        onClick={this.onClick}
        outline={selectedColor === hex ? `2px solid ${theme.darkgray}` : "none"}
        size={24}
      />
    );
  }
}
