import React from "react";

import Text from "../../components/Text";

export default class Tab extends React.PureComponent {
  onClick = () => this.props.onChangeRow(this.props.value);

  render() {
    const { isSelected, value } = this.props;

    return (
      <Text
        bg={isSelected ? "#CFCDDC" : "transparent"}
        borderRadius="16px"
        color="black"
        fontFamily="Montserrat"
        key={value}
        onClick={this.onClick}
        px="8px"
        py="4px"
      >
        {value}
      </Text>
    );
  }
}
