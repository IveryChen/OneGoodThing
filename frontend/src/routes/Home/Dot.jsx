import React from "react";

import Box from "../../components/Box";
import { theme } from "../../constants/constants";

export default class Dot extends React.PureComponent {
  onClick = () => this.props.onChangeDate(this.props.date);

  render() {
    const { size = 2 } = this.props;

    return (
      <Box
        alignSelf="center"
        bg={theme.darkbrown}
        borderRadius="50%"
        justifySelf="center"
        onClick={this.onClick}
        size={size}
      />
    );
  }
}
