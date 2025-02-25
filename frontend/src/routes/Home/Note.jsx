import styled from "@emotion/styled";
import React from "react";
import { readableColor } from "polished";

import Box from "../../components/Box";
import Text from "../../components/Text";
import format from "../../utils/format";
import formatDateString from "../../utils/formatDateString";

const StyledText = styled(Text)`
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: ${(props) => (props.row === 1 ? "16px" : "12px")};
  }
`;

export default class Note extends React.PureComponent {
  onClick = () => {
    const { onChangeEditId, onChangeShowDate, data } = this.props;

    onChangeShowDate && onChangeShowDate(formatDateString(data.createdAt));
    onChangeEditId(data._id);
  };

  render() {
    const { data, row, showContent } = this.props;
    const readable = readableColor(data.color);
    const color = data.color.replace("#", "");
    const image = `${row < 3 ? "edit" : `${color}_10`}`;

    return (
      <Box aspectRatio={1} onClick={this.onClick} position="relative">
        <Box
          alt="Note background"
          as="img"
          bg={row < 3 ? data.color : "transparent"}
          left={0}
          position="absolute"
          src={`https://onegoodthing.s3.us-east-2.amazonaws.com/${image}.png`}
          top={0}
          width="100%"
        />
        {showContent && (
          <Box
            display="grid"
            gap="2px"
            gridTemplateRows="auto 1fr"
            height="100%"
            p="12px"
            position="relative"
          >
            <StyledText
              color={readable}
              fontFamily="Montserrat"
              justifySelf="start"
              row={row}
            >
              {format(data.createdAt)}
            </StyledText>
            <StyledText
              color={readable}
              fontFamily="Montserrat"
              overflowX="hidden"
              row={row}
            >
              {data.text}
            </StyledText>
          </Box>
        )}
      </Box>
    );
  }
}
