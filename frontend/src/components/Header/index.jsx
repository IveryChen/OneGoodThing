import { branch } from "baobab-react/higher-order";
import React from "react";
import { LiaPlusSolid, LiaThLargeSolid } from "react-icons/lia";

import { theme } from "../../constants/constants";
import { withRouter } from "../../utils/withRouter";

import Box from "../Box";
import Text from "../Text";

class Header extends React.PureComponent {
  openModal = () => {
    this.props.onChangeIsOpen(true);
  };

  openNotes = () => {
    this.props.navigate("/notes");
  };

  render() {
    const { user } = this.props;

    return (
      <Box
        display="flex"
        height={56}
        justifyContent="space-between"
        p="8px"
        width="100%"
      >
        <Box>
          <Box
            as={LiaThLargeSolid}
            color={theme.darkgray}
            cursor="pointer"
            onClick={this.openNotes}
            size={32}
          />
          <Box
            as={LiaPlusSolid}
            color={theme.darkgray}
            cursor="pointer"
            onClick={this.openModal}
            size={32}
          />
        </Box>
        <Text color={theme.darkgray} textTransform="uppercase">
          {user.name}
        </Text>
      </Box>
    );
  }
}

export default withRouter(branch({ user: ["user"] }, Header));
