import React from "react";

import Box from "../../components/Box";
import { theme } from "../../constants/constants";

export default class Dot extends React.PureComponent {
  onClick = () => this.props.onChangeDate(this.props.date);

  render() {
    return (
      <Box
        alignSelf="center"
        bg={theme.lightgray}
        borderRadius="50%"
        justifySelf="center"
        onClick={this.onClick}
        size={2}
      />
    );
  }
}
