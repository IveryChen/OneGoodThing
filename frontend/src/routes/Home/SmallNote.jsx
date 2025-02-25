import React from "react";

import Box from "../../components/Box";

export default class SmallNote extends React.PureComponent {
  onClick = () => this.props.onChangeEditId(this.props.id);

  render() {
    const { data, selected } = this.props;
    const image = data.color.replace("#", "");

    return (
      <Box
        alt="Note background"
        as="img"
        onClick={this.onClick}
        opacity={selected ? 1 : 1 / 2}
        size={32}
        src={`https://onegoodthing.s3.us-east-2.amazonaws.com/${image}_10.png`}
      />
    );
  }
}
