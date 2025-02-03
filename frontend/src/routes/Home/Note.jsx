import React from "react";
import { readableColor } from "polished";
import styled from "@emotion/styled";

import Box from "../../components/Box";
import Text from "../../components/Text";

const NOTE_SVG_URL =
  "https://onegoodthing.s3.us-east-2.amazonaws.com/note1.svg";

const StyledBox = styled(Box)`
  background-image: url(${NOTE_SVG_URL});
  background-size: 150% 150%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${(props) => props.color};
  background-blend-mode: multiply;
`;

const ContentBox = styled(Box)`
  height: 100%;
  padding: 10% 10%;
  position: relative;
  width: 100%;
  z-index: 1;
`;

export default class Note extends React.PureComponent {
  onClick = () => this.props.onChangeEditId(this.props.data._id);

  render() {
    const { data, showContent } = this.props;
    const readable = readableColor(data.color);

    return (
      <Box
        aspectRatio={1}
        cursor="pointer"
        onClick={this.onClick}
        position="relative"
      >
        <StyledBox
          color={data.color}
          height="100%"
          left={0}
          position="absolute"
          top={0}
          width="100%"
        />
        {showContent && (
          <ContentBox display="grid" gridTemplateRows="auto 1fr">
            <Text color={readable} fontSize={12} justifySelf="start">
              {new Date(data.createdAt).toLocaleDateString()}
            </Text>
            <Text color={readable} overflowX="hidden">
              {data.text}
            </Text>
          </ContentBox>
        )}
      </Box>
    );
  }
}
