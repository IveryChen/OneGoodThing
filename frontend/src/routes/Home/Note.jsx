import React from "react";
import { readableColor } from "polished";

import Box from "../../components/Box";
import Text from "../../components/Text";
import format from "../../utils/format";

export default class Note extends React.PureComponent {
  onClick = () => this.props.onChangeEditId(this.props.data._id);

  render() {
    const { data, row, showContent } = this.props;
    const readable = readableColor(data.color);
    const color = data.color.replace("#", "");
    const image = `${
      row === 1 || row === 2 ? "edit" : `${color}_${row === 5 ? 10 : row}`
    }`;

    return (
      <Box aspectRatio={1} onClick={this.onClick} position="relative">
        <Box
          alt="Note background"
          as="img"
          bg={row === 1 || row === 2 ? data.color : "transparent"}
          left={0}
          position="absolute"
          src={`https://onegoodthing.s3.us-east-2.amazonaws.com/${image}.png`}
          top={0}
          width="100%"
        />
        <Box
          display="grid"
          gridTemplateRows="auto 1fr"
          height="100%"
          p="12px"
          position="relative"
        >
          {showContent && (
            <>
              <Text color={readable} fontSize={12} justifySelf="start">
                {format(data.createdAt)}
              </Text>
              <Text color={readable} overflowX="hidden">
                {data.text}
              </Text>
            </>
          )}
        </Box>
      </Box>
    );
  }
}
