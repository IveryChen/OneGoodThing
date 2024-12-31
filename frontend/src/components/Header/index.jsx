import React from "react";
import { MdAdd } from "react-icons/md";

import Box from "../../components/Box";
import { theme } from "../../constants/constants";

export default class Header extends React.PureComponent {
  render() {
    return (
      <Box height={56} p="8px">
        <Box
          bg="white"
          borderColor={theme.darkgray}
          borderRadius="50%"
          borderStyle="solid"
          borderWidth={2}
          display="grid"
          justifyContent="center"
          justifySelf="end"
          size={32}
        >
          <Box as={MdAdd} color={theme.darkgray} size="100%" />
        </Box>
      </Box>
    );
  }
}
