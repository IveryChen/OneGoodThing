import styled from "@emotion/styled";
import React from "react";

import Box from "../../components/Box";

const StyledBox = styled(Box)`
  // backdrop-filter: blur(4px);
  background-color: #ede8e8;
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
        <Box maxHeight="100%" onClick={(e) => e.stopPropagation()}>
          {children}
        </Box>
      </StyledBox>
    );
  }
}
