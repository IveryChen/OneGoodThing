import { branch } from "baobab-react/higher-order";
import React from "react";
import { LiaPlusSolid } from "react-icons/lia";

import { theme } from "../../constants/constants";
import { withRouter } from "../../utils/withRouter";

import Box from "../../components/Box";
import Text from "../../components/Text";

class Header extends React.PureComponent {
  openModal = () => {
    this.props.onChangeIsOpen(true);
  };

  render() {
    const { user } = this.props;

    return (
      <Box
        display="flex"
        height={56}
        justifyContent="space-between"
        p="12px"
        width="100%"
      >
        <Box
          as={LiaPlusSolid}
          color={theme.darkgray}
          cursor="pointer"
          onClick={this.openModal}
          size={32}
        />
        <Text color={theme.darkgray} textTransform="uppercase">
          {user.name}
        </Text>
      </Box>
    );
  }
}

export default withRouter(branch({ user: ["user"] }, Header));
