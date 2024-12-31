import styled from "@emotion/styled";
import React from "react";

import Box from "../../components/Box";

const StyledBox = styled(Box)`
  backdrop-filter: blur(4px);
`;

export default class Modal extends React.PureComponent {
  render() {
    const { isOpen, onClose, children } = this.props;

    if (!isOpen) return null;

    return (
      <StyledBox
        alignItems="center"
        bottom={0}
        display="flex"
        justifyContent="center"
        left={0}
        onClick={onClose}
        position="fixed"
        right={0}
        top={0}
      >
        <Box
          borderRadius="2px"
          borderStyle="solid"
          borderWidth={1}
          maxHeight="80%"
          onClick={(e) => e.stopPropagation()}
          overflow="auto"
        >
          {children}
        </Box>
      </StyledBox>
    );
  }
}
